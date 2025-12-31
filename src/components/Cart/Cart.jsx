import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import Button from "../Button/Button";

function Cart({ isOpen, onClose, shoppingCart, setShoppingCart }) {
  const dialogRef = useRef();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.cart}
      onClose={onClose}
      closedby="any"
    >
      <button onClick={onClose} autoFocus>
        Close
      </button>
      <h1>Cart</h1>
      {shoppingCart.length === 0 ? (
        <>
          <h2>Your cart is empty.</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop">
            <Button label="Start Shopping" onClick={onClose} />
          </Link>
        </>
      ) : (
        <></>
      )}
    </dialog>
  );
}

export default Cart;
