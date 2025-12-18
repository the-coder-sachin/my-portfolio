
const ServiceCard = ({img, title, description}) => {
  return (
    <div className="h-[230px] max-w-[210px] cursor-pointer rounded-lg text-white p-5 bg-fuchsia-600/20 saturate-[0.4] hover:saturate-150 transition-all duration-500 ease-in-out hover:scale-105 border border-transparent hover:border-white/30">
      <img src={img} alt="frontend" className="h-16 mx-auto" />
      <h3 className="font-bold text-center">{title}</h3>
      <p className="text-xs text-center mt-2 text-fuchsia-100">
       {description}
      </p>
    </div>
  );
}

export default ServiceCard