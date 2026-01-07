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
          <img src={product.image} alt={product.title} />
          <h1>{product.title}</h1>
          <Rating rating={product.rating} />
          <p>{product.description}</p>
          <p>{product.price}€</p>
          <AddItem
            product={product}
            addToCart={addToCart}
            onItemAdded={onItemAdded}
          />
          <Link to="/shop">
            <Button>See All Products</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
