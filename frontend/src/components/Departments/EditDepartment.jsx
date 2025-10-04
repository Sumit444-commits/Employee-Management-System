import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../Context/authContext";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams();
  const [depLoading, setDepLoading] = useState(true);
  const [department, setDepartment] = useState(null);
  const { Api } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setDepLoading(true);
        const response = await axios.get(`${Api}/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
      try {
        const response = await axios.put(
          `${Api}/api/department/edit/${id}`,
          department,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate("/admin-dashboard/departments");
        }
      } catch (error) {
        if (error.response && error.response.data.success) {
          alert(error.response.data.error);
        }
      }

  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h3 className="text-2xl font-bold mb-6 fontf">Edit Department</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="dep_name"
                className="block text-sm font-medium text-gray-700"
              >
                Department Name
              </label>
              <input
                type="text"
                name="dep_name"
                value={department?.dep_name}
                onChange={handleChange}
                placeholder="Enter Dep Name"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                value={department?.description}
                onChange={handleChange}
                name="description"
                placeholder="Description"
                className="block mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
