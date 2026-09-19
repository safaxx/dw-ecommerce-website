import { ADD_TO_CART } from "../constants/CartConstants";

export const addItemToCart = (product, quantity, size) => (dispatch) => {
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
};
