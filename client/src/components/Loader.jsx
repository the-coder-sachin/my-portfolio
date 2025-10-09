const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white border-t-fuchsia-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
