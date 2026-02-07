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
  total,
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

  return (
    <dialog
      ref={dialogRef}
      className={styles.cart}
      onClose={onClose}
      closedby="any"
      aria-labelledby="cart-title"
    >
      <h1 id="cart-title">Cart</h1>
      {shoppingCart.length === 0 ? (
        <div className={styles.emptyCart}>
          <h2>Your cart is empty.</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" onClick={onClose}>
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.cartItems}>
            {shoppingCart.map((item) => (
              <ItemCardCart
                key={item.id}
                item={item}
                setItemQuantity={setItemQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
          <div className={styles.cartTotal} role="status" aria-live="polite">
            <h2>Total:</h2>
            <p aria-label={`Total price: ${total}`}>{total}€</p>
          </div>
          <div className={styles.cartActions}>
            <Button variant="primary" onClick={handleCheckout}>
              Checkout
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        </>
      )}
    </dialog>
  );
}

export default Cart;
