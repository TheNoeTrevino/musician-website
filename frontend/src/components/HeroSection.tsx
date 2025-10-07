import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-black flex flex-row relative">
      <img
        className="h-screen w-full absolute object-cover object-center"
        src="/herosection_image.png"
        alt="Sebastian playing instrument in a band"
        loading="eager"
      />
      <div className="flex flex-col w-full gap-6 md:gap-10 items-center justify-center z-10 px-4">
        <div className="flex flex-col items-center text-center gap-2 md:gap-3">
          <p className="text-4xl md:text-6xl lg:text-8xl text-white">Sebastian Havner</p>
          <span className="text-textGray text-xl md:text-2xl lg:text-4xl flex flex-row gap-2">
            <span>Percussionist</span>
            <span>-</span>
            <span>Composer</span>
          </span>
        </div>

        <div className="gap-3 md:gap-5 flex flex-col sm:flex-row w-full sm:w-auto px-4 sm:px-0">
          <Link to={"/about"} className="buttonOutline cursor-pointer">
            Learn More
          </Link>
          <Link to={"/shop"} className="button bg-primary cursor-pointer">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
