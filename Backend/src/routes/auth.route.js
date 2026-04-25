import { Router } from "express";
import { getUser, login, logout, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post(verifyToken, logout)
router.route("/get-user").get(verifyToken, getUser)

export default router