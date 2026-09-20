import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  LOAD_CART_SUCCESS,
} from "../constants/CartConstants";
import axios from "axios";

const syncCart = (cartItems) => async (dispatch, getState) => {
  if (!getState().user.isAuthenticated) return;

  try {
    await axios.put("/api/v1/cart", { cartItems }, { withCredentials: true });
  } catch {
    return;
  }
};

export const loadCart = () => async (dispatch, getState) => {
  if (!getState().user.isAuthenticated) return;

  try {
    const { data } = await axios.get("/api/v1/cart", {
      withCredentials: true,
    });
    dispatch({ type: LOAD_CART_SUCCESS, payload: data.cartItems });
  } catch {
    dispatch({ type: LOAD_CART_SUCCESS, payload: [] });
  }
};

export const addItemToCart = (product, quantity, size) => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url,
      stock: product.stock,
      quantity,
      size,
    },
  });
  dispatch(syncCart(getState().cart.cartItems));
};

export const removeItemFromCart = (productId, size) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: { product: productId, size },
  });
  dispatch(syncCart(getState().cart.cartItems));
};

export const updateCartItemQuantity = (productId, size, quantity) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_CART_QUANTITY,
    payload: { product: productId, size, quantity },
  });
  dispatch(syncCart(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
};
export const clearSavedCart = () => async (dispatch) => {
  dispatch({ type: CLEAR_CART });
  await dispatch(syncCart([]));
};
