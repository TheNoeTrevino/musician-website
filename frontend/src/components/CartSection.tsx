import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { songDummyData } from "../constants/songDummyData";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CartSection = () => {
  const [items, setItems] = useState(songDummyData);

  const updateQuantity = (id: number, increment: number) => {
    setItems(
      items.map((item, index) => {
        if (index === id) {
          const newQuantity = Math.max(0, item.quantity + increment);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const getSubtotal = () => {
    const activeItems = items.filter(
      (item: { quantity: number }) => item.quantity > 0,
    );
    const total = activeItems.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0,
    );
    return { count: activeItems.length, total };
  };

  return (
    <div className="  min-h-screen flex flex-col mx-52 gap-8 text-white border-t border-textGray/40 mb-24 mt-40 py-16">
      <h1 className="text-7xl mb-8 font-light">Shopping Cart</h1>

      <div className="space-y-8 ">
        {items.map((item, index) => (
          <div
            className={`flex flex-row justify-between gap-3 pb-4 ${
              index === items.length - 1 ? "" : "border-b border-textGray/20"
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
                alt={item.title}
                className="min-w-44 h-full object-cover rounded"
              />
            </Link>

            <div className="flex flex-col justify-between ">
              <div className="w-ful">
                <Link to={"/" + item.title.replace(/ /g, "-").toLowerCase()}>
                  <h2 className="text-3xl mb-2">{item.title}</h2>
                </Link>

                <Link to={"/" + item.title.replace(/ /g, "-").toLowerCase()}>
                  <p className="text-gray-400 text-sm truncate w-96">
                    {item.description}
                  </p>
                </Link>
              </div>

              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center border border-gray-700 rounded-lg w-fit">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="px-3 py-1 text-primary hover:bg-gray-900"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border-x border-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="px-3 py-1 text-primary hover:bg-gray-900"
                  >
                    +
                  </button>
                </div>
                <IconTrash
                  onClick={() => {
                    setItems(items.filter((_, id) => id !== index));
                  }}
                  className="text-primary cursor-pointer hover:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col text-right  justify-between w-full  ">
              <p className="flex flex-col text-right underline ">{index + 1}</p>
              <p className="flex flex-col text-right  ">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-textGray/40">
        <div className="flex justify-end items-center mb-6 gap-4">
          <span className="text-lg">
            Subtotal ({getSubtotal().count} items):
          </span>
          <span className="text-lg">${getSubtotal().total.toFixed(2)}</span>
        </div>

        <a
          onClick={() => {
            toast.success("Checked Out");
          }}
          className="button cursor-pointer text-white  float-right  py-2 bg-primary"
        >
          Proceed to Checkout
        </a>
      </div>
    </div>
  );
};

export default CartSection;
