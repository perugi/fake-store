import { useOutletContext, useSearchParams } from "react-router-dom";
import { useState } from "react";
import useFetchAllItems from "../../utils/useFetchAllItems";
import ItemCard from "../../components/ItemCard/ItemCard";
import styles from "./Shop.module.css";
import CategorySelector from "./CategorySelector";

function Shop() {
  const { addToCart, onItemAdded } = useOutletContext();
  const [sorting, setSorting] = useState({ field: "title", order: "asc" });
  const [searchParams, setSearchParams] = useSearchParams({ category: "all" });
  
  const activeCategory = searchParams.get("category");

  const { items, loading, error } = useFetchAllItems();

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aValue = sorting.field === "rating" ? a.rating.rate : a[sorting.field];
    const bValue = sorting.field === "rating" ? b.rating.rate : b[sorting.field];
    
    if (sorting.order === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
      <div className={styles.shopContainer}>
        <div className={styles.sorting}>
          <label htmlFor="sortField">Sort by:</label>
          <select
            id="sortField"
            value={sorting.field}
            onChange={(e) =>
              setSorting((prev) => ({ ...prev, field: e.target.value }))
            }
          >
            <option value="title">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
          <select
            id="sortOrder"
            value={sorting.order}
            onChange={(e) =>
              setSorting((prev) => ({ ...prev, order: e.target.value }))
            }
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      <div className={styles.shop}>
        <CategorySelector
          items={items}
          activeCategory={activeCategory}
          setActiveCategory={(category) => setSearchParams({ category })}
        />
        <section className={styles.items}>
          {error ? (
            <p>Error loading products: {error.message}</p>
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            sortedItems.map((product) => (
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
    </div>
  );
}

export default Shop;
