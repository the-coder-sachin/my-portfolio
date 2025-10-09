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
      <div className="text-fuchsia-100 tracking-wide text-sm flex flex-col gap-3 text-center md:text-start">
        <p>
          I’m Sachin Kumar, a passionate Web Developer with a knack for turning
          ideas into polished, performant web experiences. Over the years, I’ve
          worked on a variety of projects — from full-scale e-commerce platforms
          and AI-driven tools to real-time chat apps — always striving to
          deliver robust, user-centric solutions. My core toolkit revolves
          around React, Tailwind CSS, and the MERN stack, with experience in
          state management (Redux, Zustand), API integrations, and clean
          architecture.
        </p>
        <p>
          What drives me is more than just coding — it’s the challenge of
          designing intuitive interfaces, architecting clean code, and
          continuously improving each project iteration. Whether I’m building a
          new component, refactoring existing logic, or experimenting with
          emerging technologies, I embrace every opportunity to optimize
          performance, maintainability, and user experience. I value
          readability, modularity, and thoughtful UX decisions, and I’m
          constantly pushing myself to adopt best practices and modern patterns.
        </p>
        <p>
          Looking ahead, I aim to solve real-world problems through scalable,
          creative solutions. I’m always eager to collaborate with
          forward-thinking teams or individuals who believe in innovation and
          quality. Whether it’s a side project, startup idea, or full-scale
          product, I’m ready to dive in, contribute meaningfully, and grow along
          the way.
        </p>
      </div>
      <div>
        <h3 className="text-white text-xl font-bold">Skills</h3>
        <div className="flex text-white gap-2 text-lg mt-3 flex-wrap justify-cente">
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600">
            <FaHtml5 />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600">
            <FaJs />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600">
            <FaNodeJs />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600">
            <FaReact />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600">
            <RiTailwindCssFill />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600">
            <SiExpress />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600">
            <SiMongodb />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600">
            <DiBootstrap />
          </span>
          <span className="bg-fuchsia-800 rounded-lg p-3 hover:bg-fuchsia-600">
            <IoLogoCss3 />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
