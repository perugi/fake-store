import { useState } from "react";
import ShoppingCart from "./ShoppingCart";

function useShoppingCart() {
  const [cart, setCart] = useState(() => new ShoppingCart());

  const addToCart = (product, quantity) => {
    setCart((prevCart) => prevCart.addItem(product, quantity));
  };

  const setItemQuantity = (productId, quantity) => {
    setCart((prevCart) => prevCart.updateQuantity(productId, quantity));
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.removeItem(productId));
  };

  const clearCart = () => {
    setCart((prevCart) => prevCart.clear());
  };

  return {
    items: cart.toArray(),
    addToCart,
    setItemQuantity,
    removeFromCart,
    clearCart,
    total: cart.getTotal(),
    itemCount: cart.getItemCount(),
  };
}

export default useShoppingCart;
