import express from "express";
import { authenticate, authorizedAdmin } from "../middlewares/auth-middleware.js";
import {createCategory, updateCategory, deleteCategory, listCategory, readCategory} from "../controllers/category-controllers.js"
const router = express.Router()
router.route("/").post(authenticate, authorizedAdmin, createCategory)
router.route("/:categoryId").put(authenticate,authorizedAdmin, updateCategory)
router.route("/:categoryId").delete(authenticate, authorizedAdmin, deleteCategory)
router.route("/categories").get(listCategory)
router.route("/:categoryId").get(readCategory)
export default router