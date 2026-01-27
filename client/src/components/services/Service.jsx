import { motion } from "framer-motion";
import assets from "../../assets";
import ServicesScroll from "./ServicesScroll";

const serviceVariants = {
  initial: { opacity: 0, y: 50 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } },
};

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Service = () => {
  return (
    <motion.section
      className="mt-10 px-4 md:px-16 min-h-screen"
      variants={serviceVariants}
      initial="initial"
      whileInView="enter"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* heading */}
      <motion.h3
        className="capitalize text-3xl font-bold text-white text-center"
        variants={cardVariants}
      >
        services
      </motion.h3>

      <motion.p
        className="capitalize text-sm text-fuchsia-100 text-center mt-5 corinthia-regular"
        variants={cardVariants}
      >
        <img src={assets.star} alt="star" className="h-4 inline mx-2" />
        Transforming ideas into intuitive digital experiences
        <img src={assets.star} alt="star" className="h-4 inline mx-2" />
      </motion.p>

      {/* cards */}
      <motion.div className="my-6" variants={cardVariants}>
        <ServicesScroll />
      </motion.div>
    </motion.section>
  );
};

export default Service;
