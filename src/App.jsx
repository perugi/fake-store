import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import styles from "./App.module.css";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);

  console.log("Shopping Cart:", shoppingCart);

  const addToCart = (product, quantity) => {
    setShoppingCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        };
        return updatedCart.toSorted((a, b) => a.title.localeCompare(b.title));
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const setItemQuantity = (productId, quantity) => {
    setShoppingCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setShoppingCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  return (
    <div className={styles.app}>
      <Header onOpenCart={() => setIsCartOpen(true)} />
      <main className={styles.main}>
        <Outlet context={{ addToCart }} />
      </main>
      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        shoppingCart={shoppingCart}
        setItemQuantity={setItemQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default App;
