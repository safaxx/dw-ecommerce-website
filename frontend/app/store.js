import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/ProductReducer";
import { productDetailsReducer } from "./reducers/ProductDetailsReducer";
import { cartReducer } from "./reducers/CartReducer";
import { userReducer } from "./reducers/UserReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer
})

const store = configureStore({
    reducer,
})

export default store