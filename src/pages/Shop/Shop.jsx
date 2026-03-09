import { useOutletContext, useSearchParams } from "react-router-dom";
import { useReducer } from "react";
import useFetchAllItems from "../../utils/useFetchAllItems";
import ItemCard from "../../components/ItemCard/ItemCard";
import styles from "./Shop.module.css";
import CategorySelector from "../../components/CategorySelector/CategorySelector";

const SORT_ACTIONS = {
  SET_FIELD: "SET_FIELD",
  SET_ORDER: "SET_ORDER",
};

function sortingReducer(state, action) {
  switch (action.type) {
    case SORT_ACTIONS.SET_FIELD:
      return {
        ...state,
        field: action.payload,
      };
    case SORT_ACTIONS.SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
}

const initialSortingState = {
  field: "title",
  order: "asc",
};

function Shop() {
  const { addToCart, onItemAdded } = useOutletContext();
  const [sorting, dispatch] = useReducer(sortingReducer, initialSortingState);
  const [searchParams, setSearchParams] = useSearchParams({ category: "all" });

  const query = searchParams.get("q") || "";
  const activeCategory = query ? "" : searchParams.get("category") || "all";

  const { items, loading, error } = useFetchAllItems();

  const filteredItems =
    activeCategory === "all" || !activeCategory
      ? items
      : items.filter((item) => item.category === activeCategory);

  const searchedItems = filteredItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  const sortedItems = [...searchedItems].sort((a, b) => {
    const aValue =
      sorting.field === "rating" ? a.rating.rate : a[sorting.field];
    const bValue =
      sorting.field === "rating" ? b.rating.rate : b[sorting.field];

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
            dispatch({ type: SORT_ACTIONS.SET_FIELD, payload: e.target.value })
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
            dispatch({ type: SORT_ACTIONS.SET_ORDER, payload: e.target.value })
          }
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className={styles.categories}>
        <CategorySelector
          items={items}
          activeCategory={activeCategory}
          setActiveCategory={(category) => setSearchParams({ category })}
        />
      </div>
      <section className={styles.items}>
        {error ? (
          <p>Error loading products: {error.message}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {query && (
              <div className={styles.searchResultsTitle}>
                Search results for "{query}"
              </div>
            )}
            {sortedItems.length === 0 ? (
              <div className={styles.noResults}>
                <p>No products found{query && ` for "${query}"`}</p>
              </div>
            ) : (
              <div className={styles.itemCards}>
                {sortedItems.map((product) => (
                  <ItemCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    onItemAdded={onItemAdded}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Shop;
