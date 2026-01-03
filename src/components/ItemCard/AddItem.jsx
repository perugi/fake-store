import { useState } from "react";
import styles from "./AddItem.module.css";
import Button from "../Button/Button";
import SetItemQuantity from "./SetItemQuantity";

function AddItem({ product, addToCart, onItemAdded }) {
  const [quantity, setQuantity] = useState(1);

  const addItemToCart = (e) => {
    e.preventDefault();
    addToCart(product, quantity);
    setQuantity(1);
    onItemAdded?.();
  };

  return (
    <form className={styles.addItem} onSubmit={addItemToCart}>
      <SetItemQuantity
        value={quantity}
        onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        onIncrement={() => setQuantity(quantity + 1)}
      />
      <Button size="small" variant="secondary" label="Add to Cart" />
    </form>
  );
}

export default AddItem;
