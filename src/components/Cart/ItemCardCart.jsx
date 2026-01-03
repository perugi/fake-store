import styles from "./ItemCardCart.module.css";
import SetItemQuantity from "../ItemCard/SetItemQuantity";

function ItemCardCart({ item, setItemQuantity, removeFromCart }) {
  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className={styles.itemCardCart}>
      <img src={item.image} alt={item.title} />
      <div>
        <h2>{item.title}</h2>
        <SetItemQuantity
          value={item.quantity}
          onDecrement={() =>
            setItemQuantity(item.id, Math.max(1, item.quantity - 1))
          }
          onChange={(e) =>
            setItemQuantity(item.id, Math.max(1, Number(e.target.value)))
          }
          onIncrement={() => setItemQuantity(item.id, item.quantity + 1)}
        />
      </div>
      <div>
        <p>{itemTotal}€</p>
        <button onClick={() => removeFromCart(item.id)}>X</button>
      </div>
    </div>
  );
}

export default ItemCardCart;
