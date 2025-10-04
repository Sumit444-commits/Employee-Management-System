import axios from "axios";
import { useAuthStore } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

export const fetchDepartment = async () => {
  let department;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/api/department`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      department = response.data.departments;
    }
  } catch (error) {
    if (error.response && error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return department;
};

// fetch employee for salary form
export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return employees;
};

export const empColumns = [
  {
    name: "S No.",
    selector: (row) => row.sno,
    width:"70px",
  },
  {
    name: "Image",
    selector: (row) => row.image,
    width:"80px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width:"120px",
  },
  {
    name: "DOB",
    selector: (row) => new Date(row.dob).toLocaleDateString(),
     sortable: true,
     width:"120px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        onClick={() => {
          navigate(`/admin-dashboard/employees/${id}`);
        }}
        className="px-3 py-1 text-white bg-blue-600"
      >
        View
      </button>
      <button
        onClick={() => {
          navigate(`/admin-dashboard/employees/edit/${id}`);
        }}
        className="px-3 py-1 text-white bg-teal-600"
      >
        Edit
      </button>
      <button
        onClick={() => {
          navigate(`/admin-dashboard/employees/salary/${id}`);
        }}
        className="px-3 py-1 text-white bg-yellow-600"
      >
        Salary
      </button>
      <button
        onClick={() => {
          navigate(`/admin-dashboard/employees/leaves/${id}`);
        }}
        className="px-3 py-1 text-white bg-red-600"
      >
        Leave
      </button>
    </div>
  );
};
