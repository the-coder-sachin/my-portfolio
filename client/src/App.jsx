import assets from "./assets";
import About from "./components/about/About";
import Home from "./components/home/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="relative bg-black/50">
      {/* background video */}

      <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
        <video
          className="w-full h-full object-cover blur-[4px]"
          src={assets.abstract}
          loop
          muted
          autoPlay
        />
      </div>

      {/* navbar */}

      <nav className="nav sticky top-5 z-10">
        <div className="mt-9 text-white">
          <Navbar />
        </div>
      </nav>

      {/* elements */}
      <Home />
      <About />
    </main>
  );
};

export default App;
