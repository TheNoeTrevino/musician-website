import React, { ReactNode, useState } from "react";
import { CartContext } from "../components/CartContext";
import { CartItems, PaymentRequestDTO } from "../dtos/dtos";

interface CartServiceProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartServiceProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const addToCart = (piece: CartItems): void => {
    // TODO: once the SQL calls and the stripe gets situated, use productId
    // instead. just in case
    const isItemInCart = cartItems.find((item) => item.title == piece.title);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((item) =>
          item.title == piece.title
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
    // TODO: once the SQL calls and the stripe gets situated, use productId
    // instead. just in case
    const isItemInCart = cartItems.find((item) => item.title == piece.title);

    if (isItemInCart?.quantity == 1) {
      setCartItems(cartItems.filter((item) => item.title != piece.title));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.title == piece.title
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    }
  };

  const removePieceFromCart = (piece: CartItems): void => {
    setCartItems(cartItems.filter((item) => item.title != piece.title));
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

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const prepareCartItemsForCheckout = () => {
    return cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
  };

  const checkoutCart = async (): Promise<void> => {
    console.log(prepareCartItemsForCheckout());
    const paymentRequest: PaymentRequestDTO = {
      products: prepareCartItemsForCheckout(),
      currency: "USD",
    };

    const response = await fetch("http://localhost:8080/payment/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentRequest),
    });
    console.log(response);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartSubtotal,
        getTotalItems,
        removePieceFromCart,
        checkoutCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
