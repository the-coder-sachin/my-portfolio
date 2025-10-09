import assets from '../../assets'

const HomeImg = () => {
  return (
        <div className="img flex justify-center items-center w-full relative">
          <img src={assets.hero} className="h-[250px] md:h-[300px] lg:h-[380px] animate-zoom" alt="hero" loading='eager' />
          <button className="absolute h-10 md:h-12 -bottom-4 md:-bottom-0 lg:-bottom-4 flex items-center gap-3 px-8 py-3 bg-gradient-to-br from-pink-900 via-violet-700 to-purple-600 bg-[length:200%_200%] bg-[position:0%_0%] rounded-full whitespace-nowrap font-semibold capitalize cursor-pointer transition-all duration-1000 ease-in-out hover:bg-[position:100%_100%]">
            <img src={assets.star} alt="star" className="h-4" />
            <span>sachin kumar</span>
            <img src={assets.star} alt="star" className="h-4" />
          </button>
        </div>
  )
}

export default HomeImg