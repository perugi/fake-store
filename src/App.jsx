import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import Toast from "./components/Toast/Toast";
import styles from "./App.module.css";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const handleItemAdded = () => {
    setToastMessage("Item added to cart!");
  };

  const handleCheckout = () => {
    setShoppingCart([]);
    setIsCartOpen(false);
    setToastMessage("Checkout complete! Thank you for your purchase.");
  };

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
      <Header
        shoppingCart={shoppingCart}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <main className={styles.main}>
        <Outlet context={{ addToCart, onItemAdded: handleItemAdded }} />
      </main>
      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        shoppingCart={shoppingCart}
        setItemQuantity={setItemQuantity}
        removeFromCart={removeFromCart}
        handleCheckout={handleCheckout}
      />
      {toastMessage && (
        <Toast
          message={toastMessage}
          onComplete={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}

export default App;
