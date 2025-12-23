import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header({ onOpenCart }) {
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search submitted");
    // TODO: Handle search logic here
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/">FakeStore</Link>
        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search store"
            aria-label="Search products"
          />
          <button
            type="submit"
            className={styles.searchButton}
            aria-label="Search"
          >
            <span className="material-icons" aria-hidden="true">
              search
            </span>
          </button>
        </form>
        <Link to="/shop">Shop</Link>
        <button
          onClick={onOpenCart}
          className={styles.cartButton}
          aria-label="Shopping cart"
        >
          <span className="material-icons" aria-hidden="true">
            shopping_cart
          </span>
        </button>
      </div>
    </div>
  );
}

export default Header;
