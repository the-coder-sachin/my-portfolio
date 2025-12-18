import { motion } from "framer-motion";
import HomeContent from "./HomeContent";
import HomeImg from "./HomeImg";

const homeVariants = {
  initial: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } },
};

const Home = () => {
  return (
    <motion.section
      className="text-white relative min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-16"
      variants={homeVariants}
      initial="initial"
      whileInView="enter"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }} // repeated scroll animation
    >
      {/* wrapper */}
      <motion.div
        variants={homeVariants}
        className="flex-1 flex justify-center"
      >
        <HomeImg />
      </motion.div>

      <motion.div
        variants={homeVariants}
        className="flex-1 flex flex-col justify-center"
      >
        <HomeContent />
      </motion.div>
    </motion.section>
  );
};

export default Home;
