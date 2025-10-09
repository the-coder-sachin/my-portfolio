import assets from "./assets";
import About from "./components/about/About";
import Home from "./components/home/Home";
import Navbar from "./components/Navbar";
import {Element} from "react-scroll";
import Service from "./components/services/Service";
import Project from "./components/projects/Project";
import Contact from "./components/contact/Contact";
import {Toaster} from "sonner"

const App = () => {
  return (
    <main className="relative bg-black/30 min-h-screen">
      {/* background video */}

      <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
        <video
          className="w-full h-full object-cover blur-[4px]"
          loop
          muted
          autoPlay
          playsInline
        ><source src="/abstract.mp4" type="video/mp4"/></video>
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
      <Toaster
        toastOptions={{
          duration: 1000,
          style: {
            background: "linear-gradient(to top left, #86198f, #dc2626)",
            color: "white",
            fontSize: "14px",
            border: "1px solid rgba(255,255,255,0.3)",
          },
          className: "custom-toast",
        }}
        position="top-left"
      />
    </main>
  );
};

export default App;
