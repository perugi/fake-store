import styles from "./CategorySelector.module.css";

const CATEGORIES = [
  "all",
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];

function capitalizeFirstLetter(val) {
  return String(val)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const CategorySelector = ({ items, activeCategory, setActiveCategory }) => {
  const itemsPerCategory = CATEGORIES.map((category) => {
    if (category === "all") {
      return items.length;
    }

    return items.reduce((count, item) => {
      if (item.category === category) {
        return count + 1;
      }
      return count;
    }, 0);
  });

  return (
    <div className={styles.categorySelector}>
      {CATEGORIES.map((category, index) => (
        <button
          className={`${styles.categoryButton} ${
            activeCategory === category ? styles.active : ""
          }`}
          key={category}
          onClick={() => setActiveCategory(category)}
        >
          <span>{capitalizeFirstLetter(category)}</span>
          <span>{itemsPerCategory[index]}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
