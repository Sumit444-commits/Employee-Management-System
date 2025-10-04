import express from "express";
import { getAttendance,updateAttendance,attendanceReport } from "../controllers/attendance-controller.js";
import authMiddleware from "../middleware/auth-middleware.js"
import defaultAttendance from "../middleware/defaultAttendance.js";

const router = express.Router();

router.route("/").get(authMiddleware,defaultAttendance,getAttendance);
router.route("/update/:employeeId").put(authMiddleware,updateAttendance);
router.route("/report").get(authMiddleware,attendanceReport);

export default router;
