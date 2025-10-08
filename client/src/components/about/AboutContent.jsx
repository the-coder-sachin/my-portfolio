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
      <h2 className="text-3xl font-bold text-white text-center md:text-start">About me</h2>
      <div className="text-fuchsia-200 text-sm flex flex-col gap-3 text-center md:text-start">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          aliquam facere quas nihil totam corrupti amet impedit et? Voluptates
          nihil reiciendis magni quos saepe labore consequatur quas hic sapiente
          repellat consequuntur quam facere fugit similique mollitia nisi
          laborum distinctio, provident, eveniet debitis officiis numquam
          pariatur quae illum. Fuga, esse ex!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          praesentium hic cupiditate quis est nostrum, aperiam temporibus,
          inventore aspernatur qui quo iusto culpa ad porro, repellendus dolorem
          animi sequi beatae? Dicta velit laudantium iure ea sit blanditiis,
          saepe provident repellendus?
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa hic
          labore quae sed illum ipsum assumenda eum ea commodi deserunt
          accusamus provident unde laboriosam, mollitia itaque? Omnis unde qui
          non cupiditate, architecto aut dolore dolorum laudantium debitis ut
          sit, rem quidem nihil id? Fugit fuga nostrum soluta temporibus,
          distinctio, esse nesciunt minus, magni deserunt sed quis voluptate
          fugiat laudantium dolorum.
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
