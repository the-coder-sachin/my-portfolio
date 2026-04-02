import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import Button from "../Button";
import Loader from "../Loader";
import assets from "../../assets";

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } },
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const inputFocusVariants = {
  whileFocus: { scale: 1.02, transition: { type: "spring", stiffness: 300 } },
};

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return toast.warning("Please enter your name");
    if (!phone || phone.length < 10)
      return toast.warning("Please enter your phone");
    if (!email) return toast.warning("Please enter your email");
    if (!isValidEmail(email))
      return toast.warning("Please enter a valid email");
    if (!message) return toast.warning("Please enter your message");

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscriber/add`,
        { name, email, phone, message }
      );
      if (response.data.success)
        toast.success("Thank you, your message sent successfully");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.log(error);
      toast.error("Something broke! please try again later"+ error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="text-white -mt-10 px-4 md:px-16 min-h-screen"
      variants={sectionVariants}
      initial="initial"
      whileInView="enter"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
    >
      {loading && <Loader />}

      {/* heading */}
      <motion.h3
        className="capitalize text-3xl font-bold text-center"
        variants={itemVariants}
      >
        Contact me
      </motion.h3>
      <motion.p
        className="capitalize text-sm text-fuchsia-100 text-center mt-5 corinthia-regular"
        variants={itemVariants}
      >
        <img src={assets.star} alt="star" className="h-4 inline mx-2" />
        Let's build something really mind blowing
        <img src={assets.star} alt="star" className="h-4 inline mx-2" />
      </motion.p>

      {/* image + form */}
      <motion.div
        className="flex p-8 justify-center flex-col md:flex-row pb-20 gap-8"
        variants={itemVariants}
      >
        {/* Image */}
        <motion.div
          className="img w-full flex justify-center items-center"
          variants={itemVariants}
        >
          <img
            src={"/group.png"}
            alt="group"
            className="w-[320px] h-[350px] object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="text-sm flex flex-col gap-3 w-full"
          variants={itemVariants}
        >
          {["Name", "Phone", "Email"].map((label, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileFocus={inputFocusVariants.whileFocus}
            >
              <label>{label}</label>
              <input
                type={
                  label === "Phone"
                    ? "tel"
                    : label === "Email"
                      ? "email"
                      : "text"
                }
                pattern={label === "Phone" ? "[0-9]*" : undefined}
                inputMode={label === "Phone" ? "numeric" : undefined}
                value={
                  label === "Name" ? name : label === "Phone" ? phone : email
                }
                onChange={
                  label === "Name"
                    ? (e) => setName(e.target.value)
                    : label === "Phone"
                      ? (e) => setPhone(e.target.value)
                      : (e) => setEmail(e.target.value)
                }
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="border w-full mt-2 border-white/50 rounded-md block p-2"
              />
            </motion.div>
          ))}

          {/* Message */}
          <motion.div
            variants={itemVariants}
            whileFocus={inputFocusVariants.whileFocus}
          >
            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
              className="border w-full mt-2 border-white/50 rounded-md block p-2 h-36 resize-none"
            />
          </motion.div>

          <div className="mx-auto md:mx-0 mt-2">
            <Button stars={true}>Send Message</Button>
          </div>
        </motion.form>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
