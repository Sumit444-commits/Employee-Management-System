import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { useAuthStore } from "../../Context/authContext";
const Sidebar = () => {
    const {user} = useAuthStore()
  return (
    <div className="bg-gray-800 h-screen text-white fixed left-0 top-0 bottom-0 space-y-4 w-64">
      <div className="bg-teal-600 text-2xl flex justify-center items-center pacifico h-16 font-semibold">
        <h3>Employee MS </h3>
      </div>
      <div className="px-4">
        <NavLink
          to={"/employee-dashboard"}
          className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
         className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
        >
          <FaUser />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
         className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
       className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
        >
          <FaCalendarAlt />
          <span>Salary</span>
        </NavLink>
       
        <NavLink
          to={"/employee-dashboard/setting"}
          className={({isActive})=>`flex items-center space-x-4 py-2.5 px-4 rounded ${isActive? "bg-teal-500": ""}`}
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
