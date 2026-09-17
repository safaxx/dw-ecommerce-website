import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/ProductReducer";
import { productDetailsReducer } from "./reducers/ProductDetailsReducer";
import { cartReducer } from "./reducers/CartReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

const store = configureStore({
    reducer,
})

export default store