import assets from "../assets";
import { IoMdCall } from "react-icons/io";


const Button = ({children, stars}) => {
  return (
    <button
      className={`relative flex items-center gap-2 bg-gradient-to-br from-pink-900 via-violet-700 to-purple-600 bg-[length:200%_200%] bg-[position:0%_0%] px-6 py-2 active:scale-75  rounded-full whitespace-nowrap h-full font-semibold capitalize cursor-pointer transition-all duration-1000 ease-in-out hover:bg-[position:100%_100%]`}
    >
      {stars && <img src={assets.star} alt="star" className="h-3" />}
      {children}
      {stars && <img src={assets.star} alt="star" className="h-3" />}
    </button>
  );
};

export default Button;
