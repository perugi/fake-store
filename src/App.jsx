import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import styles from "./App.module.css";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className={styles.app}>
      <Header onOpenCart={() => setIsCartOpen(true)} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;
