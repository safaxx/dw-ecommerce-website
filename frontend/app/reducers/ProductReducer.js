import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/ProductConstants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        count: action.payload.count,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
