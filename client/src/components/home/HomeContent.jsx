import assets from "../../assets";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import ButtonWhite from "../ButtonWhite";
import ButtonTransparent from "../ButtonTransparent";
import { Link } from "react-scroll";

const HomeContent = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center md:items-start gap-5 px-8 lg:px-12 lg:pl-22">
      <p className="uppercase text-sm lg:text-base">
        Welcome to my world{" "}
        <span>
          <img
            src={assets.star}
            alt="star"
            className="h-4 inline transform rotate-12 -translate-y-1"
          />
        </span>
      </p>
      <p>
        <span className="text-3xl font-bold">Hi, I'm</span> sachin kumar
      </p>

      <div className="text-3xl text-center md:text-start">
        <span className="text-fuchsia-400 uppercase font-bold">web</span>{" "}
        <span className="font-bold">Developer</span>
        <p className="text-xs md:text-sm text-fuchsia-200 w-3/4 mx-auto md:mx-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem repudiandae non numquam repellat? Cum maxime
          repellendus nostrum repellat harum quidem distinctio vitae, ad non
          esse, error minus praesentium consectetur sit.{" "}
        </p>
      </div>

      <div className="buttons flex gap-4 flex-col items-center md:flex-row ">
        <ButtonWhite>
          <Link to="projects" smooth={true} duration={600} offset={-90}>
            my projects
          </Link>
        </ButtonWhite>
        <ButtonTransparent>download CV</ButtonTransparent>
      </div>
      <div className="social-media-handles flex gap-5 md:pl-3">
        <button className="text-lg cursor-pointer active:scale-90 transition-all duration-300 text-fuchsia-700 bg-white hover:bg-fuchsia-700 hover:text-white rounded-full p-2">
          <FaGithub />
        </button>
        <button className="text-lg cursor-pointer active:scale-90 transition-all duration-300 text-fuchsia-700 bg-white hover:bg-fuchsia-700 hover:text-white rounded-full p-2">
          <FaLinkedinIn />
        </button>
        <button className="text-lg cursor-pointer active:scale-90 transition-all duration-300 text-fuchsia-700 bg-white hover:bg-fuchsia-700 hover:text-white rounded-full p-2">
          <TbWorld />
        </button>
      </div>
    </div>
  );
};

export default HomeContent;
