import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../features/constants"
// Call API REST (fetch)
const baseQuery = fetchBaseQuery({baseUrl: BASE_URL})
// API slice
const apiSlice = createApi({
    baseQuery, // call API,
    // khai báo các loại dữ liệu để dùng cho cache và tự động refetch dữ liệu khi có thay đổi
    tagTypes: ["Product", "Order", "User", "Category"],
    endpoints: () => ({}) //định nghĩa cac API endpoint (GET, POST, PUT, DELETE)
})
export default apiSlice
// => Định nghĩa các API endpoint cho ứng dụng (vd: lấy dsach sản phẩm, tạo đơn hàng, đăng nhập, ....)
