import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import Button from "../Button/Button";
import ItemCardCart from "./ItemCardCart";

function Cart({
  isOpen,
  onClose,
  shoppingCart,
  setItemQuantity,
  removeFromCart,
  handleCheckout,
}) {
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

  const cartTotal = shoppingCart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

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
        <>
          {shoppingCart.map((item) => (
            <ItemCardCart
              key={item.id}
              item={item}
              setItemQuantity={setItemQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
          <div className={styles.cartTotal}>
            <h2>Total:</h2>
            <p>{cartTotal}</p>
          </div>
          <Button label="Checkout" variant="primary" onClick={handleCheckout} />
          <Button
            label="Continue Shopping"
            variant="secondary"
            onClick={onClose}
          />
        </>
      )}
    </dialog>
  );
}

export default Cart;
