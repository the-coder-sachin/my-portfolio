import assets from "../assets";


const ButtonWhite = ({children}) => {
  return (
    <button
      className="relative flex items-center gap-2 px-6 py-2 h-full font-semibold capitalize cursor-pointer rounded-full whitespace-nowrap bg-white text-fuchsia-800 transition-all duration-500 ease-in-out 
      hover:bg-fuchsia-700 hover:text-white"
    >
      <img src={assets.star} alt="star" className="h-3" />
      {children}
      <img src={assets.star} alt="star" className="h-3" />
    </button>
  );
};

export default ButtonWhite;
