import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../Context/authContext";
import DataTable from "react-data-table-component";
import {
  attendanceColumns,
  AttendanceButtons,
} from "../../utils/AttendanceHelper";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);

  const [filteredAttendance, setfilteredAttendance] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const { Api } = useAuthStore();
  const statusChange = () => {
    fetchAttendance();
  };

  const fetchAttendance = async () => {
    try {
      setAttendanceLoading(true);
      const response = await axios.get(`${Api}/api/attendance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.attendance.map((att) => {
          return {
          _id: att._id,
            sno: sno++,
            employeeId: att.employeeId.employeeId,
            name: att.employeeId.userId.name,
            dep_name: att.employeeId.department.dep_name,
            action: (
              <AttendanceButtons
                employeeId={att.employeeId.employeeId}
                status={att.status}
                statusChange={statusChange}
              />
            ),
          };
        });

        setAttendance(data);
        setfilteredAttendance(data);
      }
    } catch (error) {
      if (error.response && error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setAttendanceLoading(false);
    }
  };

  const filterAttendance = (e) => {
    const records = attendance.filter((att) => {
      return (
        att.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        att.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setfilteredAttendance(records);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <>
      {attendanceLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Atandance</h3>
          </div>
          <div className="flex justify-between items-center mt-10">
            <input
              type="text"
              placeholder="Search by Emp Name or ID"
              onChange={filterAttendance}
              className="px-4 py-0.5 border bg-white"
            />
            <p className="text-2xl font-semibold">
              Mark Attendance for{" "}
              <span className="underline">
                {new Date().toISOString().split("T")[0]}
              </span>
            </p>
            <Link
              to="/admin-dashboard/attendance-report"
              className="px-4 py-1 bg-teal-600 hover:bg-teal-700 rounded text-white"
            >
              Attendance Report
            </Link>
          </div>
          <div className="mt-5">
            <DataTable
              columns={attendanceColumns}
              data={filteredAttendance}
              pagination
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Attendance;
