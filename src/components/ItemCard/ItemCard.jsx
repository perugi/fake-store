import { Link } from "react-router-dom";
import styles from "./ItemCard.module.css";
import Rating from "./Rating";
import AddItem from "./AddItem";

function ItemCard({ product, addToCart, onItemAdded }) {
  return (
    <div className={styles.itemCard}>
      <Link to={`/shop/details/${product.id}`} className={styles.cardLink}>
        <span className={styles.imageWrap}>
          <img src={product.image} alt={product.title} />
        </span>
        <h2 className={styles.title}>{product.title}</h2>
        <Rating rating={product.rating} />
        <p>{product.price}€</p>
      </Link>
      <AddItem
        product={product}
        addToCart={addToCart}
        onItemAdded={onItemAdded}
      />
    </div>
  );
}

export default ItemCard;
