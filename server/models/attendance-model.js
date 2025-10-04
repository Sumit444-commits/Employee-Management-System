import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    employeeId:{
        type: mongoose.Schema.ObjectId,
        ref: "Employee",
        required:true
    },
    status:{
        type:String,
        enum:["Present","Absent","Sick","Leave"],
        default:null
    }
})

export const Attendance = mongoose.model("Attendance",attendanceSchema)