import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../features/constants"
// Call API REST (fetch)
const baseQuery = fetchBaseQuery({baseUrl: BASE_URL})
// API slice
const apiSlice = createApi({
    // call API
    baseQuery,
    // khai báo các loại dữ liệu để dùng cho cache và tự động refetch dữ liệu khi có thay đổi
    tagTypes: ["Product", "Order", "User", "Category"],
    // định nghĩa cac API endpoint (GET, POST, PUT, DELETE)
    endpoints: () => ({})
})
export default apiSlice
// => Định nghĩa các API endpoint cho ứng dụng (vd: lấy dsach sản phẩm, tạo đơn hàng, đăng nhập, ....)
