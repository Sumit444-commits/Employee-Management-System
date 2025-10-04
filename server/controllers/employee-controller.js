import multer from "multer";
import { Employee } from "../models/employee-model.js";
import { User } from "../models/user-model.js";
import bcrypt from "bcrypt";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registerd in emp" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();
    return res.status(200).json({ success: true, message: "employee created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Add Employee Server Error" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({ success: true, employees: employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get Employee Server Error" });
  }
};
const getEmployeeById = async (req, res) => {
  const id = req.params.id;
  try {
    let employee;
     employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
      if(!employee){
        employee = await Employee.findOne({ userId: id })
      .populate("userId", { password: 0 })
      .populate("department");
      }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Get Employee By ID Server Error" });
  }
};

const editEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, maritalStatus, designation, department, salary } = req.body;
    const employee = await Employee.findById({ _id: id });

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const user = await User.findById({ _id: employee.userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );
    const updatedEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      { maritalStatus, designation, salary, department }
    );

     if (!updatedEmployee || !updatedUser) {
      return res.status(404).json({ success: false, error: "document not found" });
    }

    return res.status(200).json({success:true,message:"employee updated"})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Edit Employee server error" });
  }
};

const fetchEmployeeByDepId = async (req,res)=>{
    const id = req.params.id;
  try {
    const employees = await Employee.find({ department: id })
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Get Employee By Dep ID Server Error" });
  }
}

export {
  addEmployee,
  getEmployees,
  getEmployeeById,
  editEmployee,
 fetchEmployeeByDepId,
  upload,
};
