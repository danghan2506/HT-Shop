import express from "express";
import { authenticate, authorizedAdmin } from "../middlewares/auth-middleware.js";
import {createCategory} from "../controllers/category-controllers.js"
const router = express.Router()
router.route("/").get(authenticate, authorizedAdmin).post(createCategory)
export default router