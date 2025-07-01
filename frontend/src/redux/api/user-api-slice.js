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
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URLS}`,
                method: "POST",
                body: data
            })
        })
    })
})
export const {useLoginMutation, useRegisterMutation} = userApiSlice