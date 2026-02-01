import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import Toast from "./components/Toast/Toast";
import useShoppingCart from "./utils/useShoppingCart";
import styles from "./App.module.css";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    items: shoppingCart,
    addToCart,
    setItemQuantity,
    removeFromCart,
    clearCart,
    total,
    itemCount,
  } = useShoppingCart();
  const [toastMessage, setToastMessage] = useState(null);

  const handleItemAdded = (quantity) => {
    if (quantity > 1) {
      setToastMessage(`${quantity} items added to cart!`);
      return;
    }
    setToastMessage("Item added to cart!");
  };

  const handleCheckout = () => {
    clearCart();
    setIsCartOpen(false);
    setToastMessage("Checkout complete! Thank you for your purchase.");
  };

  return (
    <div className={styles.app}>
      <Header itemCount={itemCount} onOpenCart={() => setIsCartOpen(true)} />
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
        total={total}
      />
      {toastMessage && (
        <Toast onComplete={() => setToastMessage(null)}>{toastMessage}</Toast>
      )}
    </div>
  );
}

export default App;
