import axios from "axios";
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/ProductConstants";

export const getProducts =
  (
    keyword = "",
    page = 1,
    category = "",
    minPrice = "",
    maxPrice = "",
    inStock = false,
    sizes = [],
    featuredProduct = false,
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });
      let url = `/api/v1/products/all?keyword=${encodeURIComponent(keyword)}&page=${page}`;
      if (category) url += `&category=${encodeURIComponent(category)}`;
      if (minPrice) url += `&price[gte]=${minPrice}`;
      if (maxPrice) url += `&price[lte]=${maxPrice}`;
      if (inStock) url += `&inStock=true`;
      if (sizes.length) url += `&sizes=${encodeURIComponent(sizes.join(","))}`;
      if (featuredProduct) url += `&featuredProduct=true`;
      const { data } = await axios.get(url);
      dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
