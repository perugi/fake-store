import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import useFetchAllItems from "../../utils/useFetchAllItems";
import ItemCard from "../../components/ItemCard/ItemCard";
import styles from "./Shop.module.css";
import CategorySelector from "./CategorySelector";

function Shop() {
  const { addToCart, onItemAdded } = useOutletContext();
  const [activeCategory, setActiveCategory] = useState("all");

  const { items, loading, error } = useFetchAllItems();

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className={styles.shop}>
      <CategorySelector
        items={items}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <section className={styles.items}>
        {error ? (
          <p>Error loading products: {error.message}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          filteredItems.map((product) => (
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

export default Shop;
