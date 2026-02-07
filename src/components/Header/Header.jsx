import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

function Header({ itemCount, onOpenCart }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?q=${e.target.elements[0].value}`);
    e.target.reset();
  };

  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        FakeStore
      </Link>
      <form className={styles.searchContainer} onSubmit={handleSearch}>
        <div>
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
        </div>
      </form>
      <div className={styles.navLinks}>
        <Button variant="secondary" size="small">
          <Link to="/shop" className={styles.shopLink}>
            Shop
          </Link>
        </Button>
        <Button
          variant="primary"
          size="small"
          onClick={onOpenCart}
          aria-label="Shopping cart"
        >
          Cart
          {itemCount > 0 && (
            <span className={styles.itemCount} aria-hidden="true">
              {itemCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Header;
