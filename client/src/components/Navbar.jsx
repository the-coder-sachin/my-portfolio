import assets from "../assets";
import { IoMdCall } from "react-icons/io";
import Button from "./Button";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <div className="relative bg-white/10 border border-white/30 backdrop-blur-sm rounded-full flex items-center h-12 md:h-14 w-[90%] lg:w-3/4 mx-auto">
      <div className="fixed left-0 h-full md:flex justify-center items-center hidden">
        <img src={assets.logo} alt="logo" className="h-7 mx-6" />
      </div>
      <div className="w-full flex justify-center h-full whitespace-nowrap text-sm lg:text-base">
        <ul className="flex justify-between items-center gap-5 capitalize font-semibold h-full">
          <li className="cursor-pointer border-b-3 border-white/0 hover:border-pink-400 transition-all duration-300 h-full flex items-center">
            <span className="transition-all duration-300 active:scale-90">
              <Link
                to="home"
                smooth={true}
                duration={600}
                offset={-160} // for navbar height
              >
                Home
              </Link>
            </span>
          </li>
          <li className="cursor-pointer border-b-3 border-white/0 hover:border-pink-400 transition-all duration-300 h-full flex items-center">
            <span className="transition-all duration-300 active:scale-90">
              <Link
                to="about"
                smooth={true}
                duration={600}
                offset={-60} // for navbar height
              >
                about me
              </Link>
            </span>
          </li>
          <li className="cursor-pointer border-b-3 border-white/0 hover:border-pink-400 transition-all duration-300 h-full flex items-center">
            <span className="transition-all duration-300 active:scale-90">
              <Link
                to="service"
                smooth={true}
                duration={600}
                offset={-120} // for navbar height
              >
                services
              </Link>
            </span>
          </li>
          <li className="cursor-pointer border-b-3 border-white/0 hover:border-pink-400 transition-all duration-300 h-full flex items-center">
            <span className="transition-all duration-300 active:scale-90">
              <Link
                to="projects"
                smooth={true}
                duration={600}
                offset={-90} // for navbar height
              >
                my projects
              </Link>
            </span>
          </li>
        </ul>
      </div>
      <div className="fixed text-xs right-0 h-full p-2 invisible md:visible">
      <Link to="contact" smooth={true} duration={600} offset={-90}>
        <Button stars={true}>
          <span className="">
            <IoMdCall />
          </span>
          <span className="">contact me</span>
        </Button>
      </Link>
      </div>
      <Link to="contact" smooth={true} duration={600} offset={-90}>
        <button className="bg-white text-4xl absolute top-20 left-4 animate-bounce text-fuchsia-600 rounded-md px-1 md:invisible">
          <IoIosMail />
        </button>
      </Link>
    </div>
  );
}

export default Navbar