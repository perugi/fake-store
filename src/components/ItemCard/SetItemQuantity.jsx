import styles from "./SetItemQuantity.module.css";

function SetItemQuantity({
  value,
  onDecrement,
  onChange,
  onIncrement,
  size = "small",
}) {
  return (
    <div
      className={`${styles.quantitySelector} ${size === "large" && styles.large}`}
    >
      <button
        type="button"
        className={`${styles.quantityButton} ${styles.decrease}`}
        aria-label="Decrease quantity"
        onClick={onDecrement}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={onChange}
        min="1"
        className={styles.quantity}
      />
      <button
        type="button"
        className={`${styles.quantityButton} ${styles.increase}`}
        aria-label="Increase quantity"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
}

export default SetItemQuantity;
