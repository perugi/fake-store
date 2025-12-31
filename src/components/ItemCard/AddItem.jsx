import { useState } from "react";
import styles from "./AddItem.module.css";
import Button from "../Button/Button";

function AddItem({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  const addItemToCart = (e) => {
    e.preventDefault();
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <form className={styles.addItem} onSubmit={addItemToCart}>
      <div className={styles.quantitySelector}>
        <button
          type="button"
          className={`${styles.quantityButton} ${styles.decrease}`}
          aria-label="Decrease quantity"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          min="1"
          className={styles.quantity}
        />
        <button
          type="button"
          className={`${styles.quantityButton} ${styles.increase}`}
          aria-label="Increase quantity"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
      <Button size="small" variant="secondary" label="Add to Cart" />
    </form>
  );
}

export default AddItem;
