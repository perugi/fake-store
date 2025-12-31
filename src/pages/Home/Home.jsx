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
        fetch(`https://fakestoreapi.com/products/${id}`).then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
      )
    )
      .then((products) => {
        setTrendingProducts(products);
        console.log(products);
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
      <div className={styles.hero}>
        <div>Buy useless things.</div>
        <div>Throw away your money.</div>
        <div>Because you can.</div>
      </div>
      <Link to="/shop">
        <Button label="Start Shopping" variant="secondary" />
      </Link>
      <h1 className={styles.trending}>Trending</h1>
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
