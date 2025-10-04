import express from "express";
import dbConnect from "./utils/db.js";
import authRouter from "./routes/auth-routes.js"
import departmentRouter from "./routes/department-routes.js"
import employeeRouter from "./routes/employee-routes.js"
import salaryRouter from "./routes/salary-routes.js"
import leaveRouter from "./routes/leave-routes.js"
import settingRouter from "./routes/setting-routes.js"
import dashboardRouter from "./routes/dashboard-routes.js"
import attendanceRouter from "./routes/attendance-routes.js"
import cors from "cors"

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors())

app.use("/uploads",express.static("public/uploads"))

app.use("/api/auth",authRouter)
app.use("/api/department",departmentRouter)
app.use("/api/employee",employeeRouter)
app.use("/api/salary",salaryRouter)
app.use("/api/leave",leaveRouter)
app.use("/api/setting",settingRouter)
app.use("/api/dashboard",dashboardRouter)
app.use("/api/attendance",attendanceRouter)

app.get("/",(req, res)=>{
   res.send("hello world");
});

dbConnect().then(()=>{
app.listen(port,()=>{
    console.log("server running on the port ",port);
})
})




