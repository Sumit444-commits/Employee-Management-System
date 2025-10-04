import mongoose from "mongoose";
import {Employee} from "./employee-model.js"
import {Leave} from "./leave-model.js"
import {Salary} from "./salary-model.js"
import { User } from "./user-model.js";

// Define the Department schema
const departmentSchema = new mongoose.Schema({
  dep_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


departmentSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    if (!this || !this._id) {
      console.warn("deleteOne middleware called without valid document context.");
      return next(); // Or throw an error if appropriate
    }

    const employees = await Employee.find({ department: this._id });
    const empIds = employees.map(emp => emp._id);
    // console.log(employees.userId)
    // await User.deleteMany({_id: {$in: employees.userId}})
    await Employee.deleteMany({ department: this._id });
    await Leave.deleteMany({ employeeId: { $in: empIds } });
    await Salary.deleteMany({ employeeId: { $in: empIds } });

    next();
  } catch (error) {
    next(error);
  }
});

// Create the Department model
export const Department = mongoose.model("Department", departmentSchema);

