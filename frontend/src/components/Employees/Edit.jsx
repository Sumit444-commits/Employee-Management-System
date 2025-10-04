import React, { useEffect, useState } from "react";
import { fetchDepartment } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../Context/authContext";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Api } = useAuthStore();

  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const [departments, setDepartments] = useState(null);
  const [empLoading, setEmpLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${Api}/api/employee/edit/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    const getDepartment = async () => {
      const dep = await fetchDepartment();
      setDepartments(dep);
    };
    getDepartment();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setEmpLoading(true);
        const response = await axios.get(`${Api}/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          const emp = response.data.employee;
         
          setEmployee((prev) => ({
            ...prev,
            name: emp.userId.name,
            maritalStatus: emp.maritalStatus,
            designation: emp.designation,
            salary: emp.salary,
            department: emp.department._id,
          }));
         
        }
      } catch (error) {
        if (error.response && error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployee();
  }, []);
  return (
    <>
      {empLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={employee.name}
                  placeholder="Enter Name"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  required
                  onChange={handleChange}
                  value={employee.maritalStatus}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  onChange={handleChange}
                  value={employee.designation}
                  placeholder="Designation"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  onChange={handleChange}
                  value={employee.salary}
                  placeholder="Salary"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  required
                  onChange={handleChange}
                  value={employee.department}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Department</option>
                  {departments &&
                    departments.map((d, index) => {
                      return (
                        <option key={d._id} value={d._id}>
                          {d.dep_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Emoloyee
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Edit;
