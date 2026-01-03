import styles from "./SetItemQuantity.module.css";

function SetItemQuantity({ product: item, setItemQuantity }) {
  return (
    <div className={styles.quantitySelector}>
      <button
        type="button"
        className={`${styles.quantityButton} ${styles.decrease}`}
        aria-label="Decrease quantity"
        onClick={() => setItemQuantity(item.id, Math.max(1, item.quantity - 1))}
      >
        -
      </button>
      <input
        type="number"
        value={item.quantity}
        onChange={(e) =>
          setItemQuantity(item.id, Math.max(1, Number(e.target.value)))
        }
        min="1"
        className={styles.quantity}
      />
      <button
        type="button"
        className={`${styles.quantityButton} ${styles.increase}`}
        aria-label="Increase quantity"
        onClick={() => setItemQuantity(item.id, item.quantity + 1)}
      >
        +
      </button>
    </div>
  );
}

export default SetItemQuantity;
