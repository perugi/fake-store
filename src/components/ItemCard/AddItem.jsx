import { useState } from "react";
import styles from "./AddItem.module.css";
import Button from "../Button/Button";
import SetItemQuantity from "./SetItemQuantity";

function AddItem({ product, addToCart, onItemAdded, size = "small" }) {
  const [quantity, setQuantity] = useState(1);

  const addItemToCart = (e) => {
    e.preventDefault();
    addToCart(product, quantity);
    onItemAdded?.(quantity);
    setQuantity(1);
  };

  return (
    <form className={styles.addItem} onSubmit={addItemToCart}>
      <SetItemQuantity
        value={quantity}
        onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        onIncrement={() => setQuantity(quantity + 1)}
        size={size}
      />
      <Button size={size} variant="secondary">
        Add to Cart
      </Button>
    </form>
  );
}

export default AddItem;
