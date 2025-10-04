import { Employee } from "../models/employee-model.js";
import { Department } from "../models/department-model.js";
import { Salary } from "../models/salary-model.js";
import { Leave } from "../models/leave-model.js";
const getSummary = async (req, res) => {
  try {
    const totalEmployee = await Employee.countDocuments();
    const totalDepartment = await Department.countDocuments();
    const totalSalaries = await Employee.aggregate([
        {$group: {_id:null , totalSalary : {$sum : "$salary"}}}
    ])
    const employeeAppliedForLeave = await Leave.distinct("employeeId")
    const leaveStatus = await Leave.aggregate([
        {$group : {
            _id : "$status",
            count : {$sum:1 }
        }}
    ])
    const leaveSummary = {
        appliedFor: employeeAppliedForLeave.length,
        approved: leaveStatus.find((item)=> item._id === "Approved")?.count || 0 ,
        rejected: leaveStatus.find((item)=> item._id === "Rejected")?.count || 0 ,
        pending: leaveStatus.find((item)=> item._id === "Pending")?.count || 0 ,
    }
    

    return res.status(200).json({
        success:true,
        totalEmployee: totalEmployee,
        totalDepartment: totalDepartment,
        totalSalaries: totalSalaries[0]?.totalSalary || 0,
        leaveSummary:leaveSummary

    })
  } catch (error) {
    return res.status(500).json({success:false, error:"internal server error"})
  }
};

export { getSummary };
