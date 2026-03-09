import { useEffect, useReducer } from "react";
import { fetchReducer, initialFetchState, FETCH_ACTIONS } from "./fetchReducer";

const useFetchAllItems = () => {
  const [state, dispatch] = useReducer(fetchReducer, initialFetchState);

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.LOADING });

    fetch("https://fakestoreapi.com/products")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((products) => {
        dispatch({ type: FETCH_ACTIONS.SUCCESS, payload: products });
        console.log(products);
      })
      .catch((err) => {
        dispatch({ type: FETCH_ACTIONS.ERROR, payload: err });
        console.error("Error fetching products:", {
          message: err.message,
          name: err.name,
          stack: err.stack,
        });
      });
  }, []);

  return { items: state.items, loading: state.loading, error: state.error };
};

export default useFetchAllItems;
