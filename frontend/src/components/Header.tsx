import { IconShoppingCart } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Socials from "./Socials";
import { useCartContext } from "./CartContext";

const Header = () => {
  const { cartItems, getTotalItems } = useCartContext();

  return (
    <div className="absolute w-screen flex flex-row gap-10 justify-between items-center px-44 text-xl text-center text-white max-md:px-5 h-24 z-20  ">
      <div className="flex gap-10 justify-center items-center self-stretch my-auto font-light whitespace-nowrap min-w-[240px] w-[441px] max-md:max-w-full">
        <Link
          to={"/"}
          className="cursor-pointer hover:scale-110 transition-transform"
        >
          Home
        </Link>
        <Link
          to={"/about"}
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
        <img src="/logo.png" alt="logo" className="w-80" />
      </Link>

      <div className="flex gap-10 justify-center items-center self-stretch my-auto whitespace-nowrap min-w-[240px] w-[441px] max-md:max-w-full">
        <Socials />
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
              {getTotalItems()}
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
