import styles from "./ItemCard.module.css";
import Rating from "./Rating";
import AddItem from "./AddItem";

function ItemCard({ product }) {
  return (
    <div className={styles.itemCard}>
      <img src={product.image} alt={product.title} />
      <h2 className={styles.title}>{product.title}</h2>
      <Rating rating={product.rating} />
      <p>{product.price}€</p>
      <AddItem />
    </div>
  );
}

export default ItemCard;
