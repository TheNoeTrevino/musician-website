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
        <Link
          to={"/#about"}
          className="cursor-pointer hover:scale-110 transition-transform"
        >
          About
        </Link>
        <Link
          to={"/shop"}
          className="cursor-pointer hover:scale-110 transition-transform"
        >
          Shop
        </Link>

        {/* TODO: make this take us to a contact page instead of the section   */}
        <Link
          to={"/contact-me"}
          className="cursor-pointer hover:scale-110 transition-transform"
        >
          Contact Me
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
          <IconBrandInstagram
            strokeWidth={1}
            className="cursor-pointer hover:scale-125 transition-transform"
          />
        </a>
        <a href="https://www.youtube.com/@sebastianhavner" target="_blank">
          <IconBrandYoutube
            strokeWidth={1}
            className="cursor-pointer hover:scale-125 transition-transform"
          />
        </a>
        <a href="https://soundcloud.com/sebastian-havner" target="_blank">
          <IconBrandSoundcloud
            strokeWidth={1}
            className="cursor-pointer hover:scale-125 transition-transform"
          />
        </a>
        <a href="https://www.facebook.com/sebastian.havner.5" target="_blank">
          <IconBrandFacebook
            strokeWidth={1}
            className="cursor-pointer hover:scale-125 transition-transform"
          />
        </a>
        <Link
          to={"/cart"}
          className="flex items-center justify-center  cursor-pointer"
        >
          <IconShoppingCart
            strokeWidth={1}
            className="hover:scale-125 transition-transform "
          />
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
