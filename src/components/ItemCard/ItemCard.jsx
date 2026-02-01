import { Link } from "react-router-dom";
import styles from "./ItemCard.module.css";
import Rating from "./Rating";
import AddItem from "./AddItem";
import Button from "../Button/Button";

function ItemCard({ product, addToCart, onItemAdded }) {
  return (
    <div className={styles.itemCard}>
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.title} />
        <Link to={`/shop/details/${product.id}`} className={styles.cardLink}>
          <Button size="small">Details</Button>
        </Link>
      </div>
      <h2 className={styles.title}>{product.title}</h2>
      <Rating rating={product.rating} />
      <p className={styles.price}>{product.price}€</p>
      <div onClick={(e) => e.stopPropagation()}>
        <AddItem
          product={product}
          addToCart={addToCart}
          onItemAdded={onItemAdded}
        />
      </div>
    </div>
  );
}

export default ItemCard;
