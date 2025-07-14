import { createSlice } from "@reduxjs/toolkit";
const favSlice = createSlice({
    name: "favourite",
    initialState: [],
    reducers: {
        addToFavrourites: (state, action) => {
            if(!state.some(item => item.id === action.payload.id)) {
                state.push(action.payload);
            }
        },
        removeFromFavourites: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        setFavourites: (state, action) => {
            return action.payload
        }
    }
})
export const { addToFavrourites, removeFromFavourites, setFavourites } = favSlice.actions;
export const selectFavourites = (state) => state.setFavourites
export default favSlice.reducer