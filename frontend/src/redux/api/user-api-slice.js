import apiSlice from "./api-slice";
import { USERS_URLS } from "../features/constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URLS}/auth`,
                method: "POST",
                body: data
            })
        })
    })
})