import express from "express";
import formidable from "express-formidable"
import { authenticate, authorizedAdmin } from "../middlewares/auth-middleware.js";
import { createProduct, updateProduct, deleteProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReviews, fetchTopProducts, fetchNewProducts, fetchRelatedProducts} from "../controllers/product-controllers.js";
const router = express.Router()
router.route("/").post(authenticate, authorizedAdmin, formidable(), createProduct).get(fetchProducts)
router.route("/allproducts").get(fetchAllProducts)
router.route("/:productId/reviews").post(authenticate, addProductReviews)
router.route("/top").get(fetchTopProducts)
router.route("/new").get(fetchNewProducts)
router.route("/related/:categoryId/:productId").get(fetchRelatedProducts);
router
.route("/:productId")
.put(authenticate, authenticate, formidable(), updateProduct)
.delete(authenticate, authorizedAdmin, formidable(), deleteProduct)
.get(fetchProductById)


export default router
