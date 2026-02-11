import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

function Header({ itemCount, onOpenCart }) {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?q=${e.target.elements[0].value}`);
    e.target.reset();
    setNavOpen(false);
  };

  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        FakeStore
      </Link>
      <button
        className={styles.navToggle}
        onClick={() => setNavOpen(!navOpen)}
        aria-label="Toggle navigation"
        aria-expanded={navOpen}
      >
        <span className={styles.hamburger} aria-hidden="true"></span>
      </button>
      <nav className={`${styles.nav} ${navOpen ? styles.navVisible : ""}`}>
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
            <Link
              to="/shop"
              className={styles.shopLink}
              onClick={() => setNavOpen(false)}
            >
              Shop
            </Link>
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => {
              onOpenCart();
              setNavOpen(false);
            }}
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
      </nav>
    </div>
  );
}

export default Header;
