import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

function Header({ itemCount, onOpenCart }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?q=${e.target.elements[0].value}`);
    e.target.reset();
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
          Cart
          {itemCount > 0 && (
            <span className={styles.itemCount} aria-hidden="true">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;
