import express from "express"
import {authenticate, authorizedAdmin} from "../middlewares/auth-middleware.js"
import { calculateTotalSales, countTotalOrders, createOrder , getAllOrders, getOrderById, getUserOrders} from "../controllers/order-controllers.js"
const router = express.Router()
router.route("/").post(authenticate, createOrder).get(authenticate, authorizedAdmin, getAllOrders)
router.route("/my-orders").get(authenticate, getUserOrders)
router.route("/total-orders").get(countTotalOrders)
router.route("/total-sales").get(authenticate, authorizedAdmin, calculateTotalSales)
router.route("/:userId").get(authenticate, getOrderById)
export default router