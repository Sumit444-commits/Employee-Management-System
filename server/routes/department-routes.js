import express from "express"
import {addDepartment,getDepartments,getDepartmentById,editDepartment,deleteDepartment} from "../controllers/department-controller.js"
import verifyUser from "../middleware/auth-middleware.js"
const router = express.Router()

router.route("/").get(verifyUser,getDepartments)
router.route("/add").post(verifyUser,addDepartment)

router.route("/:id").get(verifyUser,getDepartmentById)
router.route("/edit/:id").put(verifyUser,editDepartment)
router.route("/delete/:id").delete(verifyUser,deleteDepartment)

export default router