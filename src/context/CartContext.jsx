import { createContext, useState, useContext, useEffect } from "react";
import posthog from "posthog-js";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    posthog.capture("add_to_cart");
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]); // Tömmer state
    localStorage.removeItem("cart"); // Tar bort från localStorage
  };


  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price.replace("$", "")),
    0
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice ,clearCart}}>
      {children}
    </CartContext.Provider>
  );
};
