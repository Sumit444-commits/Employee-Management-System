import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import { useAuthStore } from "../../Context/authContext";
import axios from "axios";

const AdminSummary = () => {
  const [summary,setSummary] = useState(null)
  const {Api} = useAuthStore()
  useEffect(()=>{
    const fetchSummary = async ()=>{
      try {
        const response = await axios.get(`${Api}/api/dashboard/summary`,{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        setSummary(response.data)
      } catch (error) {
        if(error.response){
          alert(error.response.data.error)
        }
        console.log(error)
      }
    }

    fetchSummary()
  },[])

  if(!summary){
    return <div>Loading...</div>
  }

  return (
    <div className="p-6">
      <h3 className="text-3xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployee}
          color={"bg-teal-600"}
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartment}
          color={"bg-yellow-600"}
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Pay"
          number={summary.totalSalaries}
          color={"bg-red-600"}
        />
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center">Leave Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leaveSummary?.appliedFor}
            color={"bg-teal-600"}
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary?.approved}
            color={"bg-green-600"}
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leaveSummary?.pending}
            color={"bg-yellow-600"}
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary?.rejected}
            color={"bg-red-600"}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
