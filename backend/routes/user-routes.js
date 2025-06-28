import express from "express";
import { createUser, login, logoutCurrentUser, getAllUsers, getProfileCurrentUser, updateUserProfile } from "../controllers/user-controllers.js";
import { authenticate, authorizedAdmin } from "../middlewares/auth-middleware.js";
const router = express.Router()
router.route("/").post(createUser).get(authenticate, authorizedAdmin, getAllUsers)
router.post("/login", login)
router.post("/logout", logoutCurrentUser)
router.route("/profile").get(authenticate,getProfileCurrentUser).put(authenticate,updateUserProfile)
export default router