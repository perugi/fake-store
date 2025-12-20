import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <Cart />
    </div>
  );
}

export default App;
