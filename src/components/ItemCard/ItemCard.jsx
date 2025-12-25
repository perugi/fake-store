import styles from './ItemCard.module.css';

function ItemCard({ product }) {
  return <div className={styles.itemCard}>
    <img src={product.image} alt={product.title} />
    <h2 className={styles.title}>{product.title}</h2>
  </div>;
}

export default ItemCard;