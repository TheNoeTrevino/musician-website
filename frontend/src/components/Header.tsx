import { IconShoppingCart, IconMenu2, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Socials from "./Socials";
import { useCartContext } from "./CartContext";

const Header = () => {
  const { cartItems, getTotalItems } = useCartContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Main Header */}
      <div className="absolute w-screen flex flex-row gap-4 md:gap-8 lg:gap-10 justify-between items-center px-4 md:px-12 lg:px-24 xl:px-44 text-xl text-center text-white h-24 z-20">
        {/* Mobile: Hamburger Menu */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 cursor-pointer hover:scale-110 transition-transform"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <IconX strokeWidth={1} size={28} />
            ) : (
              <IconMenu2 strokeWidth={1} size={28} />
            )}
          </button>
        </div>

        {/* Desktop: Navigation Links */}
        <div className="hidden md:flex gap-4 md:gap-8 lg:gap-10 justify-center items-center self-stretch my-auto font-light whitespace-nowrap min-w-[240px]">
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

        {/* Logo - Centered on Mobile */}
        <Link
          to={"/"}
          className="self-stretch my-auto cursor-pointer hover:scale-105 transition-transform"
        >
          <img src="/logo.png" alt="logo" className="w-48 md:w-64 lg:w-80" loading="eager" />
        </Link>

        {/* Right Side: Socials (Desktop) + Cart (Always) */}
        <div className="flex gap-4 md:gap-8 lg:gap-10 justify-center items-center self-stretch my-auto whitespace-nowrap">
          <div className="hidden md:block">
            <Socials />
          </div>
          <Link
            to={"/cart"}
            className="flex items-center justify-center cursor-pointer"
          >
            <IconShoppingCart
              strokeWidth={1}
              className="hover:scale-125 transition-transform"
            />
            {cartItems.length > 0 && (
              <div className="bg-secondary w-5 h-5 bg-primary rounded-full text-xs flex justify-center items-center">
                {getTotalItems()}
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-24 left-0 right-0 bg-reallyBlack border-t border-textGray/40 py-8 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-6 text-white text-xl font-light">
              <Link
                to={"/"}
                className="p-4 hover:bg-primary/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to={"/about"}
                className="p-4 hover:bg-primary/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to={"/shop"}
                className="p-4 hover:bg-primary/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to={"/contact-me"}
                className="p-4 hover:bg-primary/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Me
              </Link>
              <div className="border-t border-textGray/40 pt-6 mt-2">
                <Socials />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
