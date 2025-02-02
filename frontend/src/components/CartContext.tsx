import { createContext, useContext } from "react";
import { CartItems } from "../dtos/dtos";

interface CartContextType {
  cartItems: CartItems[];
  addToCart: (item: CartItems) => void;
  removeFromCart: (item: CartItems) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function useCartContext() {
  const cartItems = useContext(CartContext);
  if (cartItems?.cartItems == undefined) {
    throw Error("useCartContext must be used with a cartContext");
  }
  return cartItems;
}
