import express from "express";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployeeById,
  editEmployee,
  fetchEmployeeByDepId,
} from "../controllers/employee-controller.js";
import verifyUser from "../middleware/auth-middleware.js";
const router = express.Router();

router.route("/").get(verifyUser, getEmployees);
router.route("/add").post(verifyUser, upload.single("image"), addEmployee);

router.route("/:id").get(verifyUser, getEmployeeById);
router.route("/edit/:id").put(verifyUser, editEmployee);
router.route("/department/:id").get(verifyUser, fetchEmployeeByDepId);

export default router;
