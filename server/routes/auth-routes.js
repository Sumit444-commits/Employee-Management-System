import express from "express"
import { login,verify } from "../controllers/auth-controller.js"
import authMiddleware from "../middleware/auth-middleware.js"

const router = express.Router()

router.route("/login").post(login)
router.route("/verify").get(authMiddleware,verify)

export default router