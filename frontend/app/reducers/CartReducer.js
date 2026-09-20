import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  LOAD_CART_SUCCESS,
} from "../constants/CartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case LOAD_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
      };
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
                ? {
                    ...item,
                    quantity: Math.min(
                      existingItem.quantity + item.quantity,
                      item.stock
                    ),
                  }
                : cartItem
            )
          : [...state.cartItems, item],
      };
    }
    case UPDATE_CART_QUANTITY: {
      const item = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.product === item.product && cartItem.size === item.size
            ? { ...cartItem, quantity: item.quantity }
            : cartItem
        ),
      };
    }
    case REMOVE_FROM_CART: {
      const item = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) =>
            !(cartItem.product === item.product && cartItem.size === item.size)
        ),
      };
    }
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
