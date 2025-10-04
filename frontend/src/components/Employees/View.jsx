import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Context/authContext";
import axios from "axios";
import { useEffect } from "react";

const View = () => {
  const { id } = useParams();
  const [empLoading, setEmpLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const { Api } = useAuthStore();
  const navigate = useNavigate();

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
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.log(error)
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
        <div className="max-w-3xl mx-auto bg-white p-8 mt-10 rounded shadow-md">
          <h2 className="text-2xl mb-8 font-bold text-center">
            Employee Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`${Api}/uploads/${employee.userId.profileImage}`}
                alt="profile"
                className="rounded-full border w-72"
              />
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name: </p>
                <p className="font-medium">{employee.userId.name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Employee ID: </p>
                <p className="font-medium">{employee.employeeId}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Date of Birth: </p>
                <p className="font-medium">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Gender: </p>
                <p className="font-medium">{employee.gender}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Department: </p>
                <p className="font-medium">{employee.department.dep_name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Marital Status: </p>
                <p className="font-medium">{employee.maritalStatus}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default View;
