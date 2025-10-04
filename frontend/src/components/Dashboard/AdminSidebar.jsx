import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import {AiOutlineFileText} from "react-icons/ai"
const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 h-screen text-white fixed left-0 top-0 bottom-0 space-y-4 w-64">
      <div className="bg-teal-600 text-2xl flex justify-center items-center pacifico h-16 font-semibold">
        <h3>Employee MS </h3>
      </div>
      <div className="px-4">
        <NavLink
          to={"/admin-dashboard"}
          className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/employees"}
         className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
        >
          <FaUsers />
          <span>Employees</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/departments"}
         className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/leaves"}
       className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/salary/add"}
       className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/attendance"}
       className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
        >
          <FaRegCalendarAlt />
          <span>Attandance</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/attendance-report"}
       className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
        >
          <AiOutlineFileText />
          <span>Attendance Report</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/setting"}
          className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
