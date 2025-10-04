import express from "express"
import { changePassword } from "../controllers/setting-controller.js"
const router = express.Router()

router.route("/change-password").put(changePassword)

export default router