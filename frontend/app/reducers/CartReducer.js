import { ADD_TO_CART } from "../constants/CartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) =>
          cartItem.product === item.product && cartItem.size === item.size
      );

      return {
        ...state,
        cartItems: existingItem
          ? state.cartItems.map((cartItem) =>
              cartItem.product === item.product && cartItem.size === item.size
                ? item
                : cartItem
            )
          : [...state.cartItems, item],
      };
    }
    default:
      return state;
  }
};
