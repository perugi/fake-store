import { useEffect, useRef } from "react";
import styles from "./Cart.module.css";

function Cart({ isOpen, onClose }) {
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
      <h2>Cart</h2>
    </dialog>
  );
}

export default Cart;
