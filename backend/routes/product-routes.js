import express from "express";
import formidable from "express-formidable"
import { authenticate, authorizedAdmin } from "../middlewares/auth-middleware.js";
import { createProduct, updateProduct, deleteProduct } from "../controllers/product-controllers.js";
const router = express.Router()
router.route("/").post(authenticate, authorizedAdmin, formidable(), createProduct)
router.route("/:productId").put(authenticate, authenticate, formidable(), updateProduct)
router.route("/:productId").delete(authenticate, authorizedAdmin, formidable(), deleteProduct)
export default router
