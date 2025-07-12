import React, { ReactNode, useState } from "react";
import { CartContext } from "../components/CartContext";
import { CartItems, PaymentRequestDTO, PaymentResponseDTO } from "../dtos/dtos";

interface CartServiceProps {
  children: ReactNode;
}

const baseUrl = import.meta.env.VITE_BACKEND_URL;
const SESSION = "SEB_SESSION_ID";

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
      id: item.productId,
      quantity: item.quantity,
    }));
  };

  const checkoutCart = async () => {
    console.log(prepareCartItemsForCheckout());
    const paymentRequest: PaymentRequestDTO = {
      products: prepareCartItemsForCheckout(),
      currency: "USD",
    };

    const response = await fetch(`${baseUrl}/payment/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentRequest),
    });
    const paymentResponse: PaymentResponseDTO = await response.json();
    localStorage.setItem(SESSION, paymentResponse.sessionId);
    window.location.href = paymentResponse.checkoutUrl;
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
