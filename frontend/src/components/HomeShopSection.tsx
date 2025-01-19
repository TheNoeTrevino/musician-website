import { IconChevronRight } from "@tabler/icons-react";
import { songDummyData } from "../constants/songDummyData";
import { Link } from "react-router-dom";

const ShopSecton = () => {
  const items = songDummyData;

  return (
    <div className="h-screen bg-black flex flex-row pr-52 ">
      <div className="w-full">
        <img
          className="h-screen absolute "
          src="/shopsection_image.png"
          alt="Sebastian playing instrument in a band"
        />
      </div>

      <div className="flex flex-col w-full justify-between  z-10 pt-14 ">
        <div className="flex flex-col gap-3">
          <p className="text-7xl text-white">Shop</p>
          <span className="text-textGray text-4xl">
            Lorem ipsum odor amet, consectetuer <p>adipiscing elit.</p>
          </span>
        </div>

        <div className="grid grid-cols-2">
          {items.slice(0, 3).map((item, index) => (
            <div key={index}>
              <img
                className="w-full"
                src={item.image}
                alt={`${item.title} Album`}
              />
            </div>
          ))}

          <div className="flex relative items-center justify-center">
            <img
              className="absolute w-full opacity-5"
              src="/albums/blank.png"
              alt="Music Album #4"
            />
            <Link
              to={"/shop"}
              className=" button bg-primary cursor-pointer z-10"
            >
              Shop More
              <IconChevronRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSecton;
