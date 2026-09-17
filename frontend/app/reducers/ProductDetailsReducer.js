import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/ProductConstants";

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        product: {},
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
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
