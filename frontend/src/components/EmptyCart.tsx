import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center text-center gap-4 md:gap-6 lg:gap-7 w-full h-full justify-center px-4 md:px-8">
      <p className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-white">
        Looks like your shopping cart is empty.{" "}
      </p>
      <span className="text-textGray text-base sm:text-lg md:text-2xl lg:text-4xl">
        <p>
          Check out our{" "}
          <Link to={"/shop"} className="text-sky-700 underline">
            shop
          </Link>{" "}
          and consider adding something to your cart.
        </p>
      </span>
    </div>
  );
};

export default EmptyCart;
