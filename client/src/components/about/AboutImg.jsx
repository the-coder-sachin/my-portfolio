import assets from "../../assets";

const AboutImg = () => {
  return (
    <div className="img w-full h-full flex justify-center items-end">
      <div className="relative flex flex-col justify-center items-center">
        <img src={"/about.png"} alt="avatar" className="h-[400px] object-cover" loading="eager" />
        <div className="absolute bottom-2 w-48 h-3 bg-fuchsia-300 rounded-full blur-[12px] -z-[2] "></div>
      </div>
    </div>
  );
};

export default AboutImg;
