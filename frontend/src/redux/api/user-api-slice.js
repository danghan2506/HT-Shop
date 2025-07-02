import apiSlice from "./api-slice";
import { USERS_URLS } from "../features/constants";
// Gui request Login den server 
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URLS}/login`,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URLS}/logout`,
                method: "POST",
            })
        })
    })
})
export const {useLoginMutation, useLogoutMutation} = userApiSlice