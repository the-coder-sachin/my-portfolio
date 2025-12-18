import { motion } from "framer-motion";
import assets from "../../assets";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    live: "https://l-men-wear-jww4.vercel.app/",
    img: assets.lumenWear,
    title: "lumen wear",
    description:
      "Lūmen Wear is a premium e-commerce platform built using the MERN stack (MongoDB, Express, React, Node.js). Designed for a minimalist luxury clothing brand, the app delivers a seamless, high-end shopping experience for modern fashion consumers.",
    link: "https://github.com/the-coder-sachin/-L-men-Wear",
  },
  {
    live: "https://picture-it-sigma.vercel.app/",
    img: assets.pictureIt,
    title: "picture it (AI)",
    description:
      "An AI-powered text-to-image generation app built with the MERN stack (MongoDB, Express, React, Node.js). It uses the ClipDrop API to convert user text prompts into realistic images, offering a seamless and interactive creative experience.",
    link: "https://github.com/the-coder-sachin/picture-it",
  },
  {
    live: "https://live-chat-app-jan-2025.vercel.app/",
    img: assets.freeChatApp,
    title: "live chat app (socket.io)",
    description:
      "A real-time chatting application built using React, Node.js, Express, and Socket.IO. It features seamless messaging, media sharing via Cloudinary, and delivers an interactive user experience with live communication, built for speed, scalability, and responsiveness.",
    link: "https://github.com/the-coder-sachin/live-chat-app-jan-2025",
  },
  {
    live: "https://smart-ai-invoice-generator.vercel.app/",
    img: assets.smartAIInvoice,
    title: "Smart AI Invoice",
    description:
      "Smart AI Invoice Generator is a fast, simple tool to create professional invoices with signup. Enter business, client, and service details to instantly generate a clean PDF. Perfect for freelancers and small businesses needing quick, hassle-free invoices.",
    link: "https://github.com/the-coder-sachin/smart-ai-invoice-generator",
  },
];

// Container variants for section
const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } },
};

// Variants for each card
const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Project = () => {
  return (
    <motion.section
      className="text-white -mt-20 px-4 md:px-16 min-h-screen"
      variants={sectionVariants}
      initial="initial"
      whileInView="enter"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* heading */}
      <motion.h2
        className="text-center font-bold text-3xl"
        variants={cardVariants}
      >
        My Projects
      </motion.h2>

      <motion.p
        className="text-center text-fuchsia-100 mt-6 px-10 md:px-1"
        variants={cardVariants}
      >
        <img src={assets.star} alt="star" className="h-4 inline mx-2" />
        Discover the projects that showcase my passion for design, development
        and innovation
        <img src={assets.star} alt="star" className="h-4 inline mx-2" />
      </motion.p>

      {/* cards */}
      <motion.div
        className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 p-8"
        variants={cardVariants}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ProjectCard
              live={project.live}
              img={project.img}
              title={project.title}
              description={project.description}
              link={project.link}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Project;
