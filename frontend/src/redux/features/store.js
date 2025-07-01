import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import apiSlice from "../api/api-slice";
import authReducer from './Auth/auth-slice'
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // 
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})
setupListeners(store.dispatch)
