import { useState } from "react";
import assets from "../../assets";
import SubscribersModal from "./SubscribersModal";

const HomeImg = () => {
  const [subscribersOpen, setSubscribersOpen] = useState(false);

  return (
    <>
      <div
        className="img flex justify-center items-center w-full relative cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={() => setSubscribersOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSubscribersOpen(true);
          }
        }}
        aria-label="Open subscribers (password required)"
      >
        <img
          src={"/hero.png"}
          className="h-[250px] md:h-[300px] lg:h-[380px] animate-zoom pointer-events-none select-none"
          alt="hero"
          loading="eager"
          fetchPriority="high"
        />
        <span className="absolute h-10 md:h-12 -bottom-4 md:-bottom-0 lg:-bottom-4 flex items-center gap-3 px-8 py-3 bg-gradient-to-br from-pink-900 via-violet-700 to-purple-600 bg-[length:200%_200%] bg-[position:0%_0%] rounded-full whitespace-nowrap font-semibold capitalize pointer-events-none transition-all duration-1000 ease-in-out">
          <img src={assets.star} alt="" className="h-4" aria-hidden />
          <span>sachin kumar</span>
          <img src={assets.star} alt="" className="h-4" aria-hidden />
        </span>
      </div>
      <SubscribersModal
        open={subscribersOpen}
        onClose={() => setSubscribersOpen(false)}
      />
    </>
  );
};

export default HomeImg;