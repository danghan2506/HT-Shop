import { CATEGORY_URL } from "../features/constants.js";
import apiSlice from "./api-slice.js";
export const categoryApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
     createCategory: builder.mutation ({
        query: (data) => ({
            url: `${CATEGORY_URL}/`, 
            method: "POST",
            body: data
        })
     }),
     deleteCategory: builder.mutation({
        query: (categoryId) => ({
            url: `${CATEGORY_URL}/${categoryId}`,
            method: "DELETE"
        })
     }),
     updateCategory: builder.mutation({
        query: ({categoryId, updatedCategory}) => ({
            url: `${CATEGORY_URL}/${categoryId}`,
            method: "PUT",
            body: updatedCategory
        })
     }),
     getAllCategories: builder.query({
        query: () => ({
            url: `${CATEGORY_URL}/categories`, 
            method: "GET",
        })
     })

   })
})
export const {useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation, useGetAllCategoriesQuery } = categoryApiSlice;