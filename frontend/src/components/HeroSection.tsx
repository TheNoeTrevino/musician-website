import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-black flex flex-row">
      <div className="w-full"></div>
      <img
        className="h-screen absolute "
        src="/herosection_image.png"
        alt="Sebastian playing instrument in a band"
      />
      <div className="flex flex-col w-full  gap-10 items-center justify-center z-10">
        <div className="flex flex-col items-center text-center gap-3">
          <p className="text-8xl text-white">Sebastian Havner</p>
          <span className="text-textGray text-4xl">
            Percussionist <p>-</p> <p>Composer</p>
          </span>
        </div>

        <div className="gap-5 flex">
          <Link to={"/about"} className=" buttonOutline cursor-pointer ">
            Learn More
          </Link>
          <Link to={"/shop"} className="button bg-primary cursor-pointer ">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
