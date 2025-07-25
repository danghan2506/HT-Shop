import express from "express"
import {authenticate, authorizedAdmin} from "../middlewares/auth-middleware.js"
import { calcualteTotalSalesByDate, calculateTotalSales, countTotalOrders, createOrder , getAllOrders, getOrderById, getUserOrders, markOrderAsDelivered, markOrderAsPaid} from "../controllers/order-controllers.js"
const router = express.Router()
router.route("/").post(authenticate, createOrder).get(authenticate, authorizedAdmin, getAllOrders)
router.route("/my-orders").get(authenticate, getUserOrders)
router.route("/total-orders").get(countTotalOrders)
router.route("/total-sales").get(authenticate, authorizedAdmin, calculateTotalSales)
router.route("/total-sales/by-date").get(authenticate, authorizedAdmin, calcualteTotalSalesByDate)
router.route("/:orderId").get(authenticate, getOrderById)
router.route("/:orderId/payment").put(authenticate, markOrderAsPaid)
router.route("/:orderId/delivery").put(authenticate, markOrderAsDelivered)
export default router