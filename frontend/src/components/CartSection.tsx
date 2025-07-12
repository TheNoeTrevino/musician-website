import { IconTrash } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useCartContext } from "./CartContext";
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom";

const CartSection = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartSubtotal,
    getTotalItems,
    removePieceFromCart,
    checkoutCart,
  } = useCartContext();

  const fallbackSrc = "/albums/blank.png";

  return (
    <div className="  min-h-screen flex flex-col mx-52 gap-8 text-white border-t border-textGray/40 mb-24 mt-40 py-16">
      {cartItems.length != 0 ? (
        <>
          <h1 className="text-7xl mb-8 font-light">Shopping Cart</h1>
          <div className="space-y-8 ">
            {cartItems.map((item, index) => (
              <div
                className={`flex flex-row justify-between gap-3 pb-4 ${index === cartItems.length - 1
                  ? ""
                  : "border-b border-textGray/20"
                  }`}
              >
                <Link to={"/" + item.title.replace(/ /g, "-").toLowerCase()}>
                  <img
                    loading="lazy"
                    src={
                      "/albums/" +
                      item.title.replace(/ /g, "-").toLowerCase() +
                      ".png"
                    }
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = fallbackSrc;
                    }}
                    alt={item.title}
                    className="min-w-44 h-full object-cover rounded"
                  />
                </Link>

                <div className="flex flex-col justify-between ">
                  <div className="w-ful">
                    <Link
                      to={"/" + item.title.replace(/ /g, "-").toLowerCase()}
                    >
                      <h2 className="text-3xl mb-2">{item.title}</h2>
                    </Link>

                    <Link
                      to={"/" + item.title.replace(/ /g, "-").toLowerCase()}
                    >
                      <p className="text-gray-400 text-sm truncate w-96">
                        {item.description}
                      </p>
                    </Link>
                  </div>

                  <div className="flex flex-row items-center gap-4">
                    <div className="flex flex-row items-center border border-gray-700 rounded-lg w-fit">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="px-3 py-1 text-primary hover:bg-gray-900"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-x border-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3 py-1 text-primary hover:bg-gray-900"
                      >
                        +
                      </button>
                    </div>
                    <IconTrash
                      onClick={() => {
                        removePieceFromCart(item);
                      }}
                      className="text-primary cursor-pointer hover:text-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col text-right  justify-between w-full  ">
                  <p className="flex flex-col text-right underline ">
                    {index + 1}
                  </p>
                  <p className="flex flex-col text-right  ">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <IconTrash
                  onClick={() => {
                    clearCart();
                  }}
                  className="text-primary cursor-pointer hover:text-white"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-textGray/40">
            <div className="flex justify-start items-center mb-6 gap-4">
              <span className="text-lg">
                Subtotal ({getTotalItems()} items):
              </span>
              <span className="text-lg">${getCartSubtotal()}</span>
            </div>

            <div className="flex flex-col justify-end items-center mb-6 gap-4">
              <a
                onClick={checkoutCart}
                className="button cursor-pointer text-white  float-right  py-2 bg-primary"
              >
                Proceed to Checkout
              </a>
              <a
                onClick={() => {
                  clearCart();
                  toast.success("Cart has been cleared");
                }}
                className="button cursor-pointer text-white  float-right  py-2 bg-primary"
              >
                Clear Cart
              </a>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default CartSection;
