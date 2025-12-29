import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/Button";
import ItemCard from "../../components/ItemCard/ItemCard";
import styles from "./Home.module.css";
import products from "../../data/products.json";
import { useEffect } from "react";

const TRENDING_IDS = [1, 2, 3, 4, 5];

function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all(
      TRENDING_IDS.map((id) =>
        fetch(`https://fakestoreapi.com/product/${id}`).then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
      )
    )
      .then((products) => {
        setTrendingProducts(products);
      })
      .catch((err) => {
        setError(err);
        console.error("Error fetching trending products:", {
          message: err.message,
          name: err.name,
          stack: err.stack,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      Home
      <Link to="/shop">
        <Button label="Click Me" variant="secondary" />
      </Link>
      <section className={styles.trendingItems}>
        {error ? (
          <p>Error loading products: {error.message}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          trendingProducts.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))
        )}
      </section>
    </div>
  );
}

export default Home;
