import HomeContent from "./HomeContent";
import HomeImg from "./HomeImg";

const Home = () => {
  return (
    <section className="text-white relative bg-gradient-to-br">
      {/* wrapper */}
      <div className="flex mt-12 flex-col md:flex-row-reverse gap-16 sm:gap-0 justify-center">
        <HomeImg />
        {/* content */}
        <HomeContent/>
      </div>
    </section>
  );
};

export default Home;
