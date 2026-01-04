import { useEffect, useState } from "react";

const useFetchAllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((products) => {
        setItems(products);
        console.log(products);
      })
      .catch((err) => {
        setError(err);
        console.error("Error fetching products:", {
          message: err.message,
          name: err.name,
          stack: err.stack,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { items, loading, error };
};

export default useFetchAllItems;
