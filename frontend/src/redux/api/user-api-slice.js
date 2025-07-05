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
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: `${USERS_URLS}/`,
                method: "POST",
                body: data, 
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URLS}/profile`,
                method: "PUT",
                body: data
            })
        }),
        userList: builder.query({
            query: (data)  => ({
                url: `${USERS_URLS}/users-list`,
                method: "GET",
                body: data
            })
        })
    })
})
export const {useLoginMutation, useLogoutMutation, useSignupMutation, useProfileMutation, useUserListQuery} = userApiSlice