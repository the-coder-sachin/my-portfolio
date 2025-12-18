import { motion } from "framer-motion";
import AboutContent from "./AboutContent";
import AboutImg from "./AboutImg";

const aboutVariants = {
  initial: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } },
};

const About = () => {
  return (
    <motion.section
      className="relative min-h-screen mt-8 px-4 md:px-16 flex flex-col-reverse lg:flex-row gap-7 lg:gap-0 items-center"
      variants={aboutVariants}
      initial="initial"
      whileInView="enter"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* image */}
      <motion.div
        variants={aboutVariants}
        className="min-w-[300px] flex justify-center"
      >
        <AboutImg />
      </motion.div>

      {/* content */}
      <motion.div
        variants={aboutVariants}
        className="flex-1 flex flex-col justify-center"
      >
        <AboutContent />
      </motion.div>
    </motion.section>
  );
};

export default About;
