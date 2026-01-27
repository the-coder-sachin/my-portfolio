import { FaReact } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { FaJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { DiBootstrap } from "react-icons/di";

const AboutContent = () => {
  return (
    <div className="w-full flex flex-col gap-5 lg:px-12">
      <h2 className="text-3xl font-bold text-white text-center md:text-start">
        About me
      </h2>
      <div className="text-white corinthia-regular tracking-wide text-sm flex flex-col gap-3 text-center md:text-start">
        <p>
          I’m Sachin Kumar, a passionate Web Developer focused on building
          polished, high-performance web experiences. I’ve worked on diverse
          projects ranging from e-commerce platforms and AI-powered tools to
          real-time chat applications, always aiming for user-centric and
          scalable solutions. My core stack includes React, Tailwind CSS, and
          the MERN stack, along with state management, API integrations, and
          clean architecture practices.
        </p>
        <p>
          Beyond coding, I enjoy crafting intuitive interfaces, writing clean,
          maintainable code, and continuously improving performance and UX. I’m
          eager to collaborate on innovative projects where quality, creativity,
          and growth go hand in hand.
        </p>
      </div>
      <div>
        <h3 className="text-white text-xl font-bold">Skills</h3>
        <div className="flex text-white gap-2 text-lg mt-3 flex-wrap">
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600 hover:scale-110">
            <FaHtml5 />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600 hover:scale-110">
            <FaJs />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600 hover:scale-110">
            <FaNodeJs />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600 hover:scale-110">
            <FaReact />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600 hover:scale-110">
            <RiTailwindCssFill />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600 hover:scale-110">
            <SiExpress />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600 hover:scale-110">
            <SiMongodb />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600 hover:scale-110">
            <DiBootstrap />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600 hover:scale-110">
            <IoLogoCss3 />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
