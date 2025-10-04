import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthStore } from "../../Context/authContext";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  const [filteredLeaves, setfilteredLeaves] = useState([]);
  const [leaveLoading, setLeaveLoading] = useState(true);
  const { Api,user } = useAuthStore();
  let sno = 1; 
  const {id} = useParams()

  const fetchLeaves = async () => {
    try {
      setLeaveLoading(true);
      const response = await axios.get(`${Api}/api/leave/${id}/${user.role}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
     
        setLeaves(response.data.leaves);
        setfilteredLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLeaveLoading(false);
    }
  };

  const filterLeaves = (e) => {
    const records = leaves.filter((lv) => {
      return lv.leaveType.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setfilteredLeaves(records);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <>
      {leaveLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search Leave"
              onChange={filterLeaves}
              className="px-4 py-0.5 border bg-white"
            />
            {user.role === "employee" && 
            <Link
              to="/employee-dashboard/add-leave"
              className="px-4 py-1 bg-teal-600 hover:bg-teal-700 rounded text-white"
            >
              Add New Leave
            </Link>}
          </div>
          <div className="mt-10">

          
          {filteredLeaves.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Leave Type</th>
                  <th className="px-6 py-3">From</th>
                  <th className="px-6 py-3">To</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">AppliedAt</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.map((lev) => (
                  <tr
                    key={lev._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">{lev.leaveType}</td>
                    <td className="px-6 py-3">
                      {new Date(lev.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      {new Date(lev.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">{lev.reason}</td>
                    <td className="px-6 py-3">
                      {new Date(lev.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">{lev.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Recodes Found</div>
          )}
        </div>
        </div>
      )}
    </>
  );
};

export default LeaveList;
