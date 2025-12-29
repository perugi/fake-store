import styles from "./ItemCard.module.css";
import Rating from "./Rating";
import Button from "../Button/Button";

function ItemCard({ product }) {
  return (
    <div className={styles.itemCard}>
      <img src={product.image} alt={product.title} />
      <h2 className={styles.title}>{product.title}</h2>
      <Rating rating={product.rating} />
      <Button size="small" variant="secondary" label="Add to Cart" />
    </div>
  );
}

export default ItemCard;
