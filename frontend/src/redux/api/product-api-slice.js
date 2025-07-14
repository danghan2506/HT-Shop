
import { PRODUCT_URL, UPLOAD_IMAGE_URL } from "../features/constants";
import apiSlice from "./api-slice";
export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Product"]
         }),
        updateProduct: builder.mutation({
            query: ({data, productId}) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "PUT",
                body: data
            })
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "DELETE",
            }),
            providesTags: ["Product"]
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_IMAGE_URL}`,
                method: "POST",
                body: data
            })
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data.productId}/reviews`,
                method: "POST",
                body: data,
            })
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/top`,
                method: "GET"
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"]
        }),
        getNewProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/new`,
                method: "GET"
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"]
        }),
        getProduct: builder.query({
            query: ({keyword}) => ({
                url: `${PRODUCT_URL}`,
                method: "GET",
                params: {keyword}
            }),
            // Giữ dữ liệu trong cache sau khi component ngừng dùng query
            keepUnusedDataFor: 5,
            providesTags: ["Product"]
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                providesTags: (result, error, productId) => [
                    {type: "Product", id: productId}
                ], 
                method: "GET",
            })
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/allproducts`,
                method: "GET",
                invalidatesTags: ["Product"]
            })
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "GET", 
            }),
            keepUnusedDataFor: 5
        }),
    })
})
export const {useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useUploadProductImageMutation, useCreateReviewMutation, useGetTopProductsQuery, useGetNewProductsQuery, useGetProductQuery, useGetProductByIdQuery, useGetAllProductsQuery, useGetProductDetailsQuery} = productApiSlice