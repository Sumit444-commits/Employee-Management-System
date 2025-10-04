    import express from "express";
    import verifyUser from "../middleware/auth-middleware.js";
    import { getSummary } from "../controllers/dashboard-controller.js";
    const router = express.Router();

    router.route("/summary").get(verifyUser, getSummary);

    export default router;
