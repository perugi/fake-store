import { useMemo } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import useFetchItemsById from "../../utils/useFetchItemsById";
import sytles from "./ProductDetails.module.css";
import Rating from "../../components/ItemCard/Rating";
import AddItem from "../../components/ItemCard/AddItem";
import Button from "../../components/Button/Button";

function ProductDetails() {
  const { productId } = useParams();
  const { addToCart, onItemAdded } = useOutletContext();

  const productIds = useMemo(() => [productId], [productId]);
  const {
    items: [product],
    loading,
    error,
  } = useFetchItemsById(productIds);

  return (
    <div>
      {error ? (
        <p>Error loading product: {error.message}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className={sytles.productDetails}>
          <div className={sytles.imageContainer}>
            <img src={product.image} alt={product.title} />
          </div>
          <div className={sytles.productInfo}>
            <h1>{product.title}</h1>
            <Rating rating={product.rating} />
            <p className={sytles.description}>{product.description}</p>
            <p className={sytles.price}>{product.price}€</p>
            <AddItem
              product={product}
              addToCart={addToCart}
              onItemAdded={onItemAdded}
              size="large"
            />
            <Link to="/shop" className={sytles.backLink}>
              <Button size="large">&lt; See All Products</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
