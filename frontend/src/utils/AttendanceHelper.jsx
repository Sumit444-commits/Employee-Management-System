import axios from "axios";
import { useAuthStore } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

export const attendanceColumns = [
  {
    name: "S No.",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Emp Id",
    selector: (row) => row.employeeId,
    width: "120px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "120px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center:"true" 
  },
];

export const AttendanceButtons = ({ employeeId, status,statusChange }) => {
  const navigate = useNavigate();
  const {Api} = useAuthStore()

  const handleStatusChange = async (employeeId, status) => {
    try {
      const response = await axios.put(`${Api}/api/attendance/update/${employeeId}`, {status}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response)
      if(response.data.success){
        statusChange()
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {status == null ? (
        <div className="flex space-x-3">
          <button
            onClick={() => {
              handleStatusChange(employeeId, "Present");
            }}
            className="px-4 py-2 text-white bg-green-500"
          >
            Present
          </button>
          <button
            onClick={() => {
              handleStatusChange(employeeId, "Absent");
            }}
            className="px-4 py-2 text-white bg-red-500"
          >
            Absent
          </button>
          <button
            onClick={() => {
              handleStatusChange(employeeId, "Sick");
            }}
            className="px-4 py-2 text-white bg-gray-500"
          >
            Sick
          </button>
          <button
            onClick={() => {
              handleStatusChange(employeeId, "Leave");
            }}
            className="px-4 py-2 text-black bg-yellow-500"
          >
            Leave
          </button>
        </div>
      ) : (
        <p className="bg-gray-100 w-20 text-center text-black py-2 rounded">{status}</p>
      )}
    </>
  );
};
