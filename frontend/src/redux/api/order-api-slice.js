import { PAYPAL_URL, ORDER_URL } from "../features/constants";
import apiSlice from "./api-slice";
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/my-orders`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}`,
        method: "GET",
      }),
    }),
    payOrder: builder.mutation({
      query: (orderId, data) => ({
        url: `${ORDER_URL}/${orderId}/payment`,
        method: "PUT",
        body: data,
      }),
    }),
    deliverOrder: builder.mutation({
      query: (orderId, data) => ({
        url: `${ORDER_URL}/${orderId}/delivery`,
        method: "PUT",
        body: data,
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: `${PAYPAL_URL}`,
      }),
    }),
    getTotalOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-orders`,
        method: "GET",
      }),
    }),
    getTotalSales: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales`,
        method: "GET",
      }),
    }),
    getTotalSalesByDate: builder.query({
      query: () => ({
        url: `${ORDER_URL}/totals-sales/by-date`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} = orderApiSlice;
