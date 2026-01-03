import styles from "./ItemCardCart.module.css";
import SetItemQuantity from "./SetItemQuantity";

function ItemCardCart({ item, setItemQuantity, removeFromCart }) {
  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className={styles.itemCardCart}>
      <img src={item.image} alt={item.title} />
      <div>
        <h2>{item.title}</h2>
        <SetItemQuantity product={item} setItemQuantity={setItemQuantity} />
      </div>
      <div>
        <p>{itemTotal}€</p>
        <button onClick={() => removeFromCart(item.id)}>X</button>
      </div>
    </div>
  );
}

export default ItemCardCart;
