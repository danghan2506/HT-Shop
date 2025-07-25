import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import apiSlice from "../api/api-slice";
import authReducer from './Auth/auth-slice'
import cartSliceReducer from '../features/cart/cart-slice.js'
import favouriteReducer from '../features/favourite/fav-slice.js'
import { getFavFromLocalStorage } from "../../utils/local-storage";
import shopReducer from '../features/shop/shop-slice.js'
const initialFavourites = getFavFromLocalStorage() || []

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // 
        auth: authReducer,
        favourites: favouriteReducer,
        cart: cartSliceReducer,
        shop: shopReducer
    },
    preloadedState: {
        favourites: initialFavourites
    }, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})
setupListeners(store.dispatch)
