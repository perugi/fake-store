import { useReducer } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import Toast from "./components/Toast/Toast";
import useShoppingCart from "./utils/useShoppingCart";
import styles from "./App.module.css";

const UI_ACTIONS = {
  OPEN_CART: "OPEN_CART",
  CLOSE_CART: "CLOSE_CART",
  ADD_TO_CART: "ADD_TO_CART",
  CHECKOUT: "CHECKOUT",
  CLEAR_TOAST: "CLEAR_TOAST",
};

function uiReducer(state, action) {
  switch (action.type) {
    case UI_ACTIONS.OPEN_CART:
      return {
        ...state,
        isCartOpen: true,
      };
    case UI_ACTIONS.CLOSE_CART:
      return {
        ...state,
        isCartOpen: false,
      };
    case UI_ACTIONS.ADD_TO_CART:
      return {
        ...state,
        toastMessage:
          action.quantity > 1
            ? `${action.quantity} items added to cart!`
            : "Item added to cart!",
      };
    case UI_ACTIONS.CHECKOUT:
      return {
        ...state,
        isCartOpen: false,
        toastMessage: "Checkout complete! Thank you for your purchase.",
      };
    case UI_ACTIONS.CLEAR_TOAST:
      return {
        ...state,
        toastMessage: null,
      };
    default:
      return state;
  }
}

const initialUIState = {
  isCartOpen: false,
  toastMessage: null,
};

function App() {
  const [state, dispatch] = useReducer(uiReducer, initialUIState);
  const {
    items: shoppingCart,
    addToCart,
    setItemQuantity,
    removeFromCart,
    clearCart,
    total,
    itemCount,
  } = useShoppingCart();

  const handleItemAdded = (quantity) => {
    dispatch({ type: UI_ACTIONS.ADD_TO_CART, quantity });
  };

  const handleCheckout = () => {
    clearCart();
    dispatch({ type: UI_ACTIONS.CHECKOUT });
  };

  return (
    <div className={styles.app}>
      <Header
        itemCount={itemCount}
        onOpenCart={() => dispatch({ type: UI_ACTIONS.OPEN_CART })}
      />
      <main className={styles.main}>
        <Outlet context={{ addToCart, onItemAdded: handleItemAdded }} />
      </main>
      <Footer />
      <Cart
        isOpen={state.isCartOpen}
        onClose={() => dispatch({ type: UI_ACTIONS.CLOSE_CART })}
        shoppingCart={shoppingCart}
        setItemQuantity={setItemQuantity}
        removeFromCart={removeFromCart}
        handleCheckout={handleCheckout}
        total={total}
      />
      {state.toastMessage && (
        <Toast onComplete={() => dispatch({ type: UI_ACTIONS.CLEAR_TOAST })}>
          {state.toastMessage}
        </Toast>
      )}
    </div>
  );
}

export default App;
