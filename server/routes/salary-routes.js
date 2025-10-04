import express from "express";
import {
 addSalary,
 getSalary
} from "../controllers/salary-controller.js";
import verifyUser from "../middleware/auth-middleware.js";
const router = express.Router();


router.route("/add").post(verifyUser, addSalary);
router.route("/:id/:role").get(verifyUser, getSalary);


export default router;
