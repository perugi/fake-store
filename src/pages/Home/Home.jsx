import { Link, useOutletContext } from "react-router-dom";
import Button from "../../components/Button/Button";
import ItemCard from "../../components/ItemCard/ItemCard";
import useFetchItemsById from "../../utils/useFetchItemsById";
import styles from "./Home.module.css";

const TRENDING_IDS = [1, 2, 3, 4, 5];

function Home() {
  const {
    items: trendingProducts,
    loading,
    error,
  } = useFetchItemsById(TRENDING_IDS);

  const { addToCart, onItemAdded } = useOutletContext();

  return (
    <div>
      <div className={styles.hero}>Buy useless things.</div>
      <Link to="/shop">
        <Button variant="secondary">Start Shopping</Button>
      </Link>
      <h1 className={styles.trending}>Trending</h1>
      <section className={styles.trendingItems}>
        {error ? (
          <p>Error loading products: {error.message}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          trendingProducts.map((product) => (
            <ItemCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              onItemAdded={onItemAdded}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default Home;
