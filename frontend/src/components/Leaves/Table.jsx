import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../Context/authContext";
import DataTable from "react-data-table-component";

import { leaveColumns, LeaveButtons } from "../../utils/LeaveHelper";

const Table = () => {
  const [leaves, setLeaves] = useState([]);

  const [filteredLeaves, setfilteredLeaves] = useState([]);
  const [leaveLoading, setLeaveLoading] = useState(true);
  const { Api } = useAuthStore();

  const fetchLeaves = async () => {
    try {
      setLeaveLoading(true);
      const response = await axios.get(`${Api}/api/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        
        let sno = 1;
        const data = response.data.leaves.map((leave) => {
          return {
            _id: leave._id,
            sno: sno++,
            employeeId: leave.employeeId.employeeId,
            name: leave.employeeId.userId.name,
            leaveType: leave.leaveType,
            dep_name: leave.employeeId.department.dep_name,
            days:
              new Date(leave.endDate).getDate() -
              new Date(leave.startDate).getDate(),
            status: leave.status,
            action: <LeaveButtons id={leave._id} />,
          };
        });

        setLeaves(data);
        setfilteredLeaves(data);
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
      return lv.employeeId.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setfilteredLeaves(records);
  };
  const filterByButton = (status) => {
    const records = leaves.filter((lv) => {
      return lv.status === status
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
              placeholder="Search Leave by Emp Id"
              onChange={filterLeaves}
              className="px-4 py-0.5 border bg-white"
            />

            <div className="flex gap-3">
              <button className="px-4 py-1 bg-teal-600 hover:bg-teal-700 rounded text-white"
              onClick={()=>{filterByButton("Pending")}}
              >
                Pending
              </button>
              <button className="px-4 py-1 bg-teal-600 hover:bg-teal-700 rounded text-white"
              onClick={()=>{filterByButton("Approved")}}
              >
                Approved
              </button>
              <button className="px-4 py-1 bg-teal-600 hover:bg-teal-700 rounded text-white"
              onClick={()=>{filterByButton("Rejected")}}
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-10">
            <div className="mt-5">
              <DataTable
                columns={leaveColumns}
                data={filteredLeaves}
                pagination
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
