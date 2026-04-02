import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const formatDate = (iso) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
};

const messagesToText = (messages) => {
  if (!Array.isArray(messages)) return "";
  return messages.filter(Boolean).join("\n");
};

const textToMessages = (text) => {
  if (!text || !String(text).trim()) return [];
  return String(text)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
};

const getMessagesList = (row) =>
  Array.isArray(row?.messages) ? row.messages.filter(Boolean) : [];

const getMessagesPreviewText = (row) => {
  const msgs = getMessagesList(row);
  if (!msgs.length) return "";
  return msgs.join(" · ");
};

const SubscribersModal = ({ open, onClose }) => {
  const [adminPassword, setAdminPassword] = useState("");
  const [subscribers, setSubscribers] = useState(null);
  const [subscribersLoading, setSubscribersLoading] = useState(false);
  const [editDraft, setEditDraft] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [detailRow, setDetailRow] = useState(null);

  useEffect(() => {
    if (!open) {
      setAdminPassword("");
      setSubscribers(null);
      setSubscribersLoading(false);
      setEditDraft(null);
      setSavingEdit(false);
      setDeletingId(null);
      setDetailRow(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (detailRow) {
        setDetailRow(null);
        return;
      }
      if (editDraft && !savingEdit) {
        setEditDraft(null);
        return;
      }
      onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, editDraft, savingEdit, detailRow]);

  const fetchSubscribers = async () => {
    if (adminPassword !== ADMIN_PASSWORD) {
      toast.error("Incorrect password");
      return;
    }
    try {
      setSubscribersLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscriber/`
      );
      if (data.success && Array.isArray(data.data)) {
        setSubscribers(data.data);
        toast.success("Subscribers loaded");
      } else {
        setSubscribers([]);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setSubscribers([]);
        toast.info("No subscribers yet");
      } else {
        console.error(error);
        toast.error("Could not load subscribers");
      }
    } finally {
      setSubscribersLoading(false);
    }
  };

  const isAdmin = adminPassword === ADMIN_PASSWORD;

  const openEdit = (row) => {
    if (!isAdmin) {
      toast.error("Enter the correct password and load subscribers first");
      return;
    }
    setDetailRow(null);
    setEditDraft({
      id: row._id,
      name: row.name ?? "",
      email: row.email ?? "",
      phone: row.phone ?? "",
      messagesText: messagesToText(row.messages),
    });
  };

  const closeEdit = () => {
    if (savingEdit) return;
    setEditDraft(null);
  };

  const saveEdit = async () => {
    if (!editDraft?.id || !isAdmin) return;
    try {
      setSavingEdit(true);
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscriber/${editDraft.id}`,
        {
          name: editDraft.name.trim() || undefined,
          email: editDraft.email.trim(),
          phone: editDraft.phone.trim() || undefined,
          messages: textToMessages(editDraft.messagesText),
        }
      );
      if (data.success && data.data) {
        setSubscribers((prev) =>
          Array.isArray(prev)
            ? prev.map((s) => (s._id === data.data._id ? data.data : s))
            : prev
        );
        toast.success("Subscriber updated");
        setEditDraft(null);
      }
    } catch (error) {
      console.error(error);
      const msg =
        error.response?.data?.message ||
        (error.response?.status === 409
          ? "Email already in use"
          : "Could not update subscriber");
      toast.error(msg);
    } finally {
      setSavingEdit(false);
    }
  };

  const listLoaded = subscribers !== null;

  const confirmDelete = async (row) => {
    if (!isAdmin) {
      toast.error("Enter the correct password and load subscribers first");
      return;
    }
    const label = row.email || "this subscriber";
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;
    try {
      setDetailRow((d) => (d && d._id === row._id ? null : d));
      setDeletingId(row._id);
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscriber/${row._id}`
      );
      setSubscribers((prev) =>
        Array.isArray(prev) ? prev.filter((s) => s._id !== row._id) : prev
      );
      toast.success("Subscriber deleted");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete subscriber");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="subscribers-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close modal"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscribers-modal-title"
            className={
              listLoaded
                ? "relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-xl border border-white/20 bg-gradient-to-br from-rose-950/95 via-black/95 to-fuchsia-950/95 shadow-xl text-white"
                : "relative w-full max-w-[min(100%,24rem)] flex flex-col rounded-2xl border border-white/25 bg-gradient-to-br from-rose-950/98 via-black/98 to-fuchsia-950/98 shadow-2xl shadow-fuchsia-950/40 ring-1 ring-white/10 text-white"
            }
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={
                listLoaded
                  ? "flex items-center justify-between gap-4 px-5 py-4 border-b border-white/15 shrink-0"
                  : "flex items-center justify-between gap-3 px-4 pt-4 pb-3 shrink-0"
              }
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {!listLoaded && (
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-fuchsia-500/15 ring-1 ring-fuchsia-400/30"
                    aria-hidden
                  >
                    <svg
                      className="h-5 w-5 text-fuchsia-200/90"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.75}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                )}
                <div className="min-w-0">
                  <h2
                    id="subscribers-modal-title"
                    className={
                      listLoaded
                        ? "text-lg font-semibold text-fuchsia-200/95"
                        : "text-base font-semibold tracking-tight text-fuchsia-100/95"
                    }
                  >
                    Subscribers
                  </h2>
                  {!listLoaded && (
                    <p className="mt-0.5 text-[11px] leading-snug text-white/50">
                      Admin sign-in
                    </p>
                  )}
                </div>
                {listLoaded && (
                  <button
                    type="button"
                    onClick={fetchSubscribers}
                    disabled={subscribersLoading}
                    className="shrink-0 text-xs px-2.5 py-1 rounded-md border border-white/25 text-white/85 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
                  >
                    {subscribersLoading ? "Refreshing…" : "Refresh"}
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className={
                  listLoaded
                    ? "rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white transition"
                    : "rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition"
                }
                aria-label="Close"
              >
                <svg
                  className={listLoaded ? "w-5 h-5" : "w-4 h-4"}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {!listLoaded && (
              <div className="px-4 pb-5 pt-1 shrink-0">
                <p className="text-xs text-white/55 leading-relaxed mb-4">
                  Enter your password to view and manage the subscriber list.
                </p>
                <label
                  htmlFor="subscriber-admin-password"
                  className="block text-[11px] font-medium uppercase tracking-wider text-fuchsia-200/75"
                >
                  Password
                </label>
                <input
                  id="subscriber-admin-password"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !subscribersLoading) fetchSubscribers();
                  }}
                  placeholder="••••••••"
                  autoComplete="off"
                  className="mt-1.5 w-full rounded-lg border border-white/25 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-500/25"
                />
                <button
                  type="button"
                  onClick={fetchSubscribers}
                  disabled={subscribersLoading}
                  className="mt-4 w-full rounded-lg border border-transparent bg-gradient-to-r from-fuchsia-600/90 to-rose-600/85 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-fuchsia-950/40 transition hover:from-fuchsia-500/95 hover:to-rose-500/90 disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {subscribersLoading ? "Loading…" : "Load subscribers"}
                </button>
              </div>
            )}

            {listLoaded && (
            <div
              className="px-5 pb-5 overflow-auto flex-1 min-h-0 subscribers-modal-scroll pt-4"
            >
                <div className="rounded-lg border border-white/20 overflow-hidden">
                  {subscribers.length === 0 ? (
                    <p className="p-6 text-center text-white/70 text-sm">
                      No subscribers in the database.
                    </p>
                  ) : (
                    <>
                      {/* Narrow: email + message preview; row opens detail modal */}
                      <div className="md:hidden overflow-x-auto subscribers-modal-scroll">
                        <table className="w-full text-left text-sm min-w-0">
                          <thead>
                            <tr className="border-b border-white/20 bg-white/5">
                              <th className="p-2.5 sm:p-3 font-medium text-fuchsia-200/90 w-[38%]">
                                Email
                              </th>
                              <th className="p-2.5 sm:p-3 font-medium text-fuchsia-200/90">
                                Messages
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {subscribers.map((row, i) => (
                              <tr
                                key={row._id ?? i}
                                role="button"
                                tabIndex={0}
                                aria-label={`Open full details for ${row.email || "subscriber"}`}
                                onClick={() => setDetailRow(row)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setDetailRow(row);
                                  }
                                }}
                                className="border-b border-white/10 hover:bg-white/5 cursor-pointer active:bg-white/10"
                              >
                                <td className="p-2.5 sm:p-3 break-all align-top text-xs sm:text-sm">
                                  {row.email}
                                </td>
                                <td className="p-2.5 sm:p-3 align-top text-xs sm:text-sm text-white/85">
                                  <span className="line-clamp-3 break-words">
                                    {getMessagesPreviewText(row) || "—"}
                                  </span>
                                  <span className="mt-1 block text-[10px] sm:text-xs text-fuchsia-300/80">
                                    Tap for full details
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* md+: full table; messages compressed, click to open detail */}
                      <div className="hidden md:block overflow-x-auto subscribers-modal-scroll">
                        <table className="w-full text-left text-sm min-w-[800px]">
                          <thead>
                            <tr className="border-b border-white/20 bg-white/5">
                              <th className="p-3 font-medium text-fuchsia-200/90">#</th>
                              <th className="p-3 font-medium text-fuchsia-200/90">Name</th>
                              <th className="p-3 font-medium text-fuchsia-200/90">Email</th>
                              <th className="p-3 font-medium text-fuchsia-200/90">Phone</th>
                              <th className="p-3 font-medium text-fuchsia-200/90 min-w-[200px]">
                                Messages
                              </th>
                              <th className="p-3 font-medium text-fuchsia-200/90">Added</th>
                              <th className="p-3 font-medium text-fuchsia-200/90 w-[140px]">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {subscribers.map((row, i) => (
                              <tr
                                key={row._id ?? i}
                                onClick={() => setDetailRow(row)}
                                className="border-b border-white/10 hover:bg-white/5 cursor-pointer active:bg-white/10"
                              >
                                <td className="p-3 text-white/60">{i + 1}</td>
                                <td className="p-3">{row.name || "—"}</td>
                                <td className="p-3 break-all">{row.email}</td>
                                <td className="p-3">{row.phone || "—"}</td>
                                <td className="p-3 max-w-[280px] align-top">
                                  {getMessagesList(row).length ? (
                                    <div className="group text-left w-full line-clamp-2 text-white/85">
                                      <span className="break-words">
                                        {getMessagesPreviewText(row)}
                                      </span>
                                      <span className="mt-0.5 block text-[11px] text-fuchsia-300/70 group-hover:text-fuchsia-200/90">
                                        Row click for full details
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-white/45">—</span>
                                  )}
                                </td>
                                <td className="p-3 text-white/80 whitespace-nowrap">
                                  {formatDate(row.createdAt)}
                                </td>
                                <td
                                  className="p-3 align-top"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="flex flex-wrap gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => openEdit(row)}
                                      className="rounded-md px-2.5 py-1 text-xs border border-fuchsia-400/50 text-fuchsia-100 hover:bg-fuchsia-500/20 transition"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => confirmDelete(row)}
                                      disabled={deletingId === row._id}
                                      className="rounded-md px-2.5 py-1 text-xs border border-red-400/50 text-red-200 hover:bg-red-500/20 transition disabled:opacity-50"
                                    >
                                      {deletingId === row._id ? "…" : "Delete"}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
            </div>
            )}
          </motion.div>

          {detailRow && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 pointer-events-none">
              <button
                type="button"
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-auto"
                aria-label="Close subscriber details"
                onClick={() => setDetailRow(null)}
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="subscriber-detail-title"
                className="relative z-10 w-full max-w-lg max-h-[85vh] flex flex-col min-h-0 rounded-xl border border-white/25 bg-gradient-to-br from-rose-950/98 via-black/98 to-fuchsia-950/98 shadow-2xl p-5 sm:p-6 text-white pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3 shrink-0">
                  <h3
                    id="subscriber-detail-title"
                    className="text-base font-semibold text-fuchsia-200/95"
                  >
                    Subscriber details
                  </h3>
                  <button
                    type="button"
                    onClick={() => setDetailRow(null)}
                    className="rounded-md p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition shrink-0"
                    aria-label="Close details"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-4 overflow-y-auto flex-1 min-h-0 subscribers-modal-scroll pr-1 space-y-4 text-sm">
                  <dl className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 items-baseline">
                      <dt className="text-fuchsia-200/75 font-medium text-xs uppercase tracking-wide">
                        Name
                      </dt>
                      <dd className="text-white/95 break-words">
                        {detailRow.name?.trim() || "—"}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 items-baseline">
                      <dt className="text-fuchsia-200/75 font-medium text-xs uppercase tracking-wide">
                        Email
                      </dt>
                      <dd className="text-white/95 break-all">
                        {detailRow.email || "—"}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 items-baseline">
                      <dt className="text-fuchsia-200/75 font-medium text-xs uppercase tracking-wide">
                        Phone
                      </dt>
                      <dd className="text-white/95 break-words">
                        {detailRow.phone?.trim() || "—"}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 items-start">
                      <dt className="text-fuchsia-200/75 font-medium text-xs uppercase tracking-wide pt-0.5">
                        Added
                      </dt>
                      <dd className="text-white/90 whitespace-normal">
                        {formatDate(detailRow.createdAt)}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 items-start">
                      <dt className="text-fuchsia-200/75 font-medium text-xs uppercase tracking-wide pt-0.5">
                        Messages
                      </dt>
                      <dd className="text-white/95 min-w-0">
                        {getMessagesList(detailRow).length ? (
                          <ul className="list-disc list-inside space-y-2 break-words">
                            {getMessagesList(detailRow).map((m, j) => (
                              <li key={j}>{m}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-white/50">—</span>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/15 shrink-0">
                  <button
                    type="button"
                    onClick={() => setDetailRow(null)}
                    className="px-4 py-2 rounded-md border border-white/30 text-white/90 hover:bg-white/10 transition text-sm"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(detailRow)}
                    className="px-4 py-2 rounded-md border border-fuchsia-400/60 text-fuchsia-100 hover:bg-fuchsia-500/20 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => confirmDelete(detailRow)}
                    disabled={deletingId === detailRow._id}
                    className="px-4 py-2 rounded-md border border-red-400/50 text-red-200 hover:bg-red-500/20 transition text-sm disabled:opacity-50"
                  >
                    {deletingId === detailRow._id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {editDraft && (
            <div
              className="fixed inset-0 z-[111] flex items-center justify-center p-3 sm:p-6 pointer-events-none"
            >
              <button
                type="button"
                className="absolute inset-0 bg-black/55 backdrop-blur-[2px] pointer-events-auto"
                aria-label="Close edit form"
                onClick={closeEdit}
              />
              <div
                role="dialog"
                aria-labelledby="edit-subscriber-title"
                className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-white/25 bg-gradient-to-br from-rose-950/98 via-black/98 to-fuchsia-950/98 shadow-2xl p-5 text-white pointer-events-auto subscribers-modal-scroll"
                onClick={(e) => e.stopPropagation()}
              >
                <h3
                  id="edit-subscriber-title"
                  className="text-base font-semibold text-fuchsia-200/95 mb-4"
                >
                  Edit subscriber
                </h3>
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="edit-sub-name"
                      className="text-xs text-white/70"
                    >
                      Name
                    </label>
                    <input
                      id="edit-sub-name"
                      type="text"
                      value={editDraft.name}
                      onChange={(e) =>
                        setEditDraft((d) => ({ ...d, name: e.target.value }))
                      }
                      className="border w-full mt-1 border-white/50 rounded-md block p-2 bg-black/30 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-sub-email"
                      className="text-xs text-white/70"
                    >
                      Email
                    </label>
                    <input
                      id="edit-sub-email"
                      type="email"
                      required
                      value={editDraft.email}
                      onChange={(e) =>
                        setEditDraft((d) => ({ ...d, email: e.target.value }))
                      }
                      className="border w-full mt-1 border-white/50 rounded-md block p-2 bg-black/30 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-sub-phone"
                      className="text-xs text-white/70"
                    >
                      Phone
                    </label>
                    <input
                      id="edit-sub-phone"
                      type="text"
                      value={editDraft.phone}
                      onChange={(e) =>
                        setEditDraft((d) => ({ ...d, phone: e.target.value }))
                      }
                      className="border w-full mt-1 border-white/50 rounded-md block p-2 bg-black/30 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-sub-messages"
                      className="text-xs text-white/70"
                    >
                      Messages (one per line)
                    </label>
                    <textarea
                      id="edit-sub-messages"
                      rows={4}
                      value={editDraft.messagesText}
                      onChange={(e) =>
                        setEditDraft((d) => ({
                          ...d,
                          messagesText: e.target.value,
                        }))
                      }
                      className="border w-full mt-1 border-white/50 rounded-md block p-2 bg-black/30 text-white placeholder:text-white/40 resize-y min-h-[96px] subscribers-modal-scroll"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-end gap-2 mt-5">
                  <button
                    type="button"
                    onClick={closeEdit}
                    disabled={savingEdit}
                    className="px-4 py-2 rounded-md border border-white/30 text-white/90 hover:bg-white/10 transition disabled:opacity-50 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveEdit}
                    disabled={savingEdit || !editDraft.email?.trim()}
                    className="px-4 py-2 rounded-md border border-fuchsia-400/60 text-fuchsia-100 hover:bg-fuchsia-500/20 transition disabled:opacity-50 text-sm"
                  >
                    {savingEdit ? "Saving…" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscribersModal;
