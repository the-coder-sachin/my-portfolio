import AboutContent from "./AboutContent";
import AboutImg from "./AboutImg";

const About = () => {
  return (
    <section className="relative min-h-screen">
      {/* content */}
      <div className="flex flex-col-reverse lg:flex-row gap-7 lg:gap-0 p-12 t-32">
        {/* image */}
        <div className="min-w-[300px]">
        <AboutImg/>
        </div>
        {/* content */}
        <div>
        <AboutContent/>
        </div>
      </div>
    </section>
  );
};

export default About;
