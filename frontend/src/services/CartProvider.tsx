import React, { ReactNode, useState } from "react";
import { CartContext } from "../components/CartContext";
import { CartItems } from "../dtos/dtos";

interface CartServiceProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartServiceProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const addToCart = (piece: CartItems): void => {
    const isItemInCart = cartItems.find(
      (item) => item.productId == piece.productId,
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((item) =>
          item.productId == piece.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...piece, quantity: 1 }]);
    }
    console.log(cartItems);
  };

  const removeFromCart = (piece: CartItems): void => {
    const isItemInCart = cartItems.find(
      (item) => item.productId == piece.productId,
    );

    if (isItemInCart?.quantity == 1) {
      setCartItems(
        cartItems.filter((item) => item.productId != piece.productId),
      );
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.productId == piece.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    }
  };

  const clearCart = (): void => {
    setCartItems([]);
  };

  const getCartSubtotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
