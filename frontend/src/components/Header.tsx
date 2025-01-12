import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandSoundcloud,
  IconBrandYoutube,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [cartItems] = useState(["song1", "song2", "song3"]);

  return (
    <div className="absolute w-screen flex flex-row gap-10 justify-between items-center px-44 text-xl text-center text-white max-md:px-5 h-24 z-20  ">
      <div className="flex gap-10 justify-center items-center self-stretch my-auto font-light whitespace-nowrap min-w-[240px] w-[441px] max-md:max-w-full">
        <Link to={"/#about"} className="cursor-pointer">
          About
        </Link>
        <Link to={"/shop"} className="cursor-pointer">
          Shop
        </Link>

        <Link to={"/#contact"} className="cursor-pointer">
          Contact Us
        </Link>
      </div>

      <Link
        to={"/"}
        className="self-stretch my-auto text-5xl max-md:text-4xl cursor-pointer hover:scale-105 transition-transform"
      >
        <img loading="lazy" src="/logo.png" alt="logo" className="w-80" />
      </Link>

      <div className="flex gap-10 justify-center items-center self-stretch my-auto whitespace-nowrap min-w-[240px] w-[441px] max-md:max-w-full">
        <a
          href="https://www.instagram.com/sebastianhavnermusic/"
          target="_blank"
        >
          <IconBrandInstagram className="cursor-pointer" />
        </a>
        <a href="https://www.youtube.com/@sebastianhavner" target="_blank">
          <IconBrandYoutube className="cursor-pointer" />
        </a>
        <a href="https://soundcloud.com/sebastian-havner" target="_blank">
          <IconBrandSoundcloud className="cursor-pointer" />
        </a>
        <a href="https://www.facebook.com/sebastian.havner.5" target="_blank">
          <IconBrandFacebook className="cursor-pointer" />
        </a>
        <Link
          to={"/cart"}
          className="flex items-center justify-center  cursor-pointer"
        >
          <IconShoppingCart />
          {cartItems.length > 0 && (
            <div className=" bg-secondary  w-5 h-5 bg-primary rounded-full text-xs flex justify-center items-center">
              {cartItems.length}
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
