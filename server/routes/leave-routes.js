import express from "express";
import verifyUser from "../middleware/auth-middleware.js";
import {
  addLeave,
  getLeaves,
  fetchLeavestoAdmin,
  fetchLeaveDataById,
  updateStatus
} from "../controllers/leave-controller.js";
const router = express.Router();

router.route("/detail/:id").get(verifyUser, fetchLeaveDataById);
router.route("/:userId/:role").get(getLeaves);
router.route("/add").post(verifyUser, addLeave);
router.route("/").get(verifyUser, fetchLeavestoAdmin);
router.route("/detail/status-update/:id").put(verifyUser, updateStatus);

export default router;
