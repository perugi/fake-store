import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import ItemCard from "../../components/ItemCard/ItemCard";
import styles from "./Home.module.css";
import products from "../../data/products.json";
import { useEffect } from "react";

function Home() {
  const trendingIds = [1, 2, 3, 4, 5]
  console.log(trendingProducts);
  const [trendingProcust, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all(
      trendingIds.map(id =>
        fetch(`https://fakestoreapi.com/products/${id}`)
          .then(response => {

    )
  
  return (
    <div>
      Home
      <Link to="/shop">
        <Button label="Click Me" variant="secondary"/>
      </Link>
      <section className={styles.trendingItems}>
        {trendingProducts.map(product => (
          <ItemCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Home;
