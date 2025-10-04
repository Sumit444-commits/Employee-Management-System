import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Context/authContext";

export const columns = [
  {
    name: "S No.",
    selector: (row) => row.sno,
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable:true 
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ id, onDepartmentDelete }) => {
  const navigate = useNavigate();
  const { Api } = useAuthStore();
  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(`${Api}/api/department/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          onDepartmentDelete();
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        onClick={() => {
          navigate(`/admin-dashboard/department/${id}`);
        }}
        className="px-3 py-1 text-white bg-teal-600"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(id)}
        className="px-3 py-1 text-white bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};
