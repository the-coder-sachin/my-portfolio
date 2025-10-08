import assets from "../../assets"
import ServiceCard from "./ServiceCard"
import ServicesScroll from "./ServicesScroll";


const Service = () => {
  return (
    <section className="">
      <h3 className="capitalize text-3xl font-bold text-white text-center">
        services
      </h3>
      <p className="capitalize text-sm text-fuchsia-100 text-center mt-5">
        <img src={assets.star} alt="star" className="h-4 inline mx-2" />
        Transforming ideas into intuitive digital experiences 
        <img src={assets.star} alt="star" className="h-4 inline mx-2" />
      </p>

      {/* cards */}
      <div className="my-6">
      <ServicesScroll/>
      </div>
    </section>
  );
}

export default Service