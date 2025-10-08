import assets from "../assets";


const ButtonTransparent = ({children}) => {
  return (
    <button className="relative flex items-center gap-2 px-6 py-2 active:scale-75 border border-white/70 bg-white/10 backdrop-blur-sm rounded-full whitespace-nowrap h-full font-semibold capitalize cursor-pointer transition-all duration-1000 ease-in-out hover:bg-black">
     <img src={assets.star} alt="star" className="h-3" />
     {children}
     <img src={assets.star} alt="star" className="h-3" />
    </button>
  );
};

export default ButtonTransparent;
