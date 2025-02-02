import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center text-center gap-7 w-full h-full justify-center">
      <p className="text-8xl text-white">
        Looks like your shopping cart is empty.{" "}
      </p>
      <span className="text-textGray text-4xl">
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
