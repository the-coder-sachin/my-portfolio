import assets from '../../../assets'
import ProjectCard from './ProjectCard'

const Project = () => {
  return (
    <section className="text-white">
      <h2 className="text-center font-bold text-3xl mt-20">My Projects</h2>
      <p className="text-center text-fuchsia-100 mt-6">
        <img src={assets.star} alt="star" className="h-4 inline mx-2" />
        Discover the projects that showcase my passion for design , development
        and innovation
        <img src={assets.star} alt="star" className="h-4 inline mx-2" />
      </p>

      {/* cards */}
      <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 p-8">
        <a href="https://l-men-wear-jww4.vercel.app/">
          <ProjectCard
            img={assets.lumenWear}
            title={"lumen wear"}
            description={
              "Lūmen Wear is a premium e-commerce platform built using the MERN stack (MongoDB, Express, React, Node.js). Designed for a minimalist luxury clothing brand, the app delivers a seamless, high-end shopping experience for modern fashion consumers."
            }
            link={"https://github.com/the-coder-sachin/-L-men-Wear"}
          />
        </a>
        <a href="https://picture-it-sigma.vercel.app/">
          <ProjectCard
            img={assets.pictureIt}
            title={"picture it (AI)"}
            description={
              "An AI-powered text-to-image generation app built with the MERN stack (MongoDB, Express, React, Node.js). It uses the ClipDrop API to convert user text prompts into realistic images, offering a seamless and interactive creative experience."
            }
            link={"https://github.com/the-coder-sachin/picture-it"}
          />
        </a>
        <a href="https://live-chat-app-jan-2025.vercel.app/">
          <ProjectCard
            img={assets.freeChatApp}
            title={"live chat app (socket.io)"}
            description={
              "A real-time chatting application built using React, Node.js, Express, and Socket.IO. It features seamless messaging, media sharing via Cloudinary, and delivers an interactive user experience with live communication, built for speed, scalability, and responsiveness."
            }
            link={"https://github.com/the-coder-sachin/live-chat-app-jan-2025"}
          />
        </a>
      </div>
    </section>
  );
}

export default Project