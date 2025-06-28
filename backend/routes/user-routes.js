import express from "express";
import { createUser, login, logoutCurrentUser } from "../controllers/user-controllers.js";
const router = express.Router()
router.post("/", createUser)
router.post("/login", login)
router.post("/logout", logoutCurrentUser)
export default router