import express from "express"
import {authenticate, authorizeAdmin} from "../middlewares/auth-middleware.js"
const router = express.Router()
router.route("/").post(authenticate, createOrder)
export default router