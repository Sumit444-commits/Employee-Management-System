import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";
import { useAuthStore } from "../../Context/authContext";
const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setfilteredDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(true);
  const { Api } = useAuthStore();
  const fetchDepartments = async () => {
    try {
      setDepLoading(true);
      const response = await axios.get(`${Api}/api/department`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => {
          return {
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (
              <DepartmentButtons
                id={dep._id}
                onDepartmentDelete={onDepartmentDelete}
              />
            ),
          };
        });

        setDepartments(data);
        setfilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const onDepartmentDelete = (id) => {
    const data = departments.filter((dep) => {
      return dep._id !== id;
    });
    setDepartments(data);
    fetchDepartments();
  };

  const filterDepartments = (e) => {
    const records = departments.filter((d) => {
      return d.dep_name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setfilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by Dep Name"
              onChange={filterDepartments}
              className="px-4 py-0.5 border bg-white"
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 hover:bg-teal-700 rounded text-white"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
