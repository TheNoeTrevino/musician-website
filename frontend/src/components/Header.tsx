import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandSoundcloud,
  IconBrandYoutube,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useState } from "react";

const Header = () => {
  const [cartItems] = useState(["song1", "song2", "song3"]);

  return (
    <div className="absolute w-screen flex flex-row gap-10 justify-between items-center px-44 text-xl text-center text-white max-md:px-5 h-24 z-20  ">
      <div className="flex gap-10 justify-center items-center self-stretch my-auto font-light whitespace-nowrap min-w-[240px] w-[441px] max-md:max-w-full">
        <a href="/#about" className="cursor-pointer">
          About
        </a>
        <a href="/shop" className="cursor-pointer">
          Shop
        </a>
        <a href="/#contact" className="cursor-pointer">
          Contact Us
        </a>
      </div>

      <a
        href="/"
        className="self-stretch my-auto text-5xl max-md:text-4xl cursor-pointer hover:scale-105 transition-transform"
      >
        <img src="/logo.png" alt="logo" className="w-80" />
      </a>

      <div className="flex gap-10 justify-center items-center self-stretch my-auto whitespace-nowrap min-w-[240px] w-[441px] max-md:max-w-full">
        <IconBrandInstagram className="cursor-pointer" />
        <IconBrandYoutube className="cursor-pointer" />
        <IconBrandSoundcloud className="cursor-pointer" />
        <IconBrandFacebook className="cursor-pointer" />
        <a
          href="/cart"
          className="flex items-center justify-center  cursor-pointer"
        >
          <IconShoppingCart />
          {cartItems.length > 0 && (
            <div className=" bg-secondary  w-5 h-5 bg-primary rounded-full text-xs flex justify-center items-center">
              {cartItems.length}
            </div>
          )}
        </a>
      </div>
    </div>
  );
};

export default Header;
