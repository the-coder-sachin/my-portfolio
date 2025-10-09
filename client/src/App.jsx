import assets from "./assets";
import About from "./components/about/About";
import Home from "./components/home/Home";
import Navbar from "./components/Navbar";
import {Element} from "react-scroll";
import Service from "./components/services/Service";
import Project from "./components/projects/Project";
import Contact from "./components/contact/Contact";
import {ToastContainer} from "react-toastify"

const App = () => {
  return (
    <main className="relative bg-black/50 min-h-screen">
      {/* background video */}

      <div className="absolute inset-0 -z-10 overflow-hidden bg-black will-change-transform">
        <video
          className="w-full h-full object-cover blur-[4px] transform-gpu"
          src={assets.abstract}
          loop
          muted
          autoPlay
          playsInline
        />
      </div>

      {/* navbar */}

      <nav className="nav sticky top-5 z-10">
        <div className="text-white">
          <Navbar />
        </div>
      </nav>

      {/* elements */}
      <Element name="home">
        <Home />
      </Element>
      <Element name="about">
        <About />
      </Element>
      <Element name="service">
        <Service />
      </Element>
      <Element name="projects">
        <Project />
      </Element>
      <Element name="contact">
        <Contact />
      </Element>
      <ToastContainer
        className={"text-xs"}
        theme="dark"
        hideProgressBar={true}
        position="top-left"
        autoClose={2000}
      />
    </main>
  );
};

export default App;
