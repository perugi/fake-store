import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import styles from "./App.module.css";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState({});

  console.log("Shopping Cart:", shoppingCart);

  const addToCart = (product, quantity) => {
    setShoppingCart((prevCart) => {
      const existingItem = prevCart[product.id];
      return {
        ...prevCart,
        [product.id]: {
          ...product,
          quantity: existingItem ? existingItem.quantity + quantity : quantity,
        },
      };
    });
  };

  const setItemQuantity = (productId, quantity) => {
    setShoppingCart((prevCart) => ({
      ...prevCart,
      [productId]: {
        ...prevCart[productId],
        quantity,
      },
    }));
  };

  const removeFromCart = (productId) => {
    setShoppingCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
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
