import { Leave } from "../models/leave-model.js";
import { Employee } from "../models/employee-model.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    // 🔍 Find the employee by userId
    const employee = await Employee.findOne({ userId: userId });

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found for the user" });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    return res
      .status(200)
      .json({ success: true, message: "Leave applied successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Leave Add Server Error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const { userId, role } = req.params;

    let leaves;
    if (role === "admin") {
      leaves = await Leave.find({ employeeId: userId });
    } else {
      const employee = await Employee.findOne({ userId: userId });
      leaves = await Leave.find({ employeeId: employee._id });
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Leave add server error" });
  }
};
const fetchLeavestoAdmin = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" },
      ],
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error in getting all leaves" });
  }
};

const fetchLeaveDataById = async (req, res) => {
  try {
    const id = req.params.id;

    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: ["name", "profileImage"] },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error in getting leave data" });
  }
};
const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: status }
    );
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave not founded" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error in updating leave status",
      });
  }
};

export {
  addLeave,
  getLeaves,
  fetchLeavestoAdmin,
  fetchLeaveDataById,
  updateStatus,
};
