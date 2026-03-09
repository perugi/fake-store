export const FETCH_ACTIONS = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export function fetchReducer(state, action) {
  switch (action.type) {
    case FETCH_ACTIONS.LOADING:
      return {
        items: [],
        loading: true,
        error: null,
      };
    case FETCH_ACTIONS.SUCCESS:
      return {
        items: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_ACTIONS.ERROR:
      return {
        items: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const initialFetchState = {
  items: [],
  loading: true,
  error: null,
};
