import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../Context/authContext";
import DataTable from "react-data-table-component";
import { empColumns, EmployeeButtons } from "../../utils/EmployeeHelper";

const List = () => {
  const [employees, setEmployees] = useState([]);

  const [filteredEmployees, setfilteredEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(true);
  const { Api } = useAuthStore();

  const fetchEmployees = async () => {
    try {
      setEmpLoading(true);
      const response = await axios.get(`${Api}/api/employee`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.employees.map((emp) => {
          return {
            _id: emp._id,
            sno: sno++,
            image: <img src={`${Api}/uploads/${emp.userId.profileImage}`} className="w-10 h-10 rounded-full" />,
            name:emp.userId.name,
            dob:emp.dob,
            dep_name: emp.department.dep_name,
            action: (
              <EmployeeButtons
                id={emp._id}
              />
            ),
          };
        });

        setEmployees(data);
        setfilteredEmployees(data);
      }
    } catch (error) {
      if (error.response && error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setEmpLoading(false);
    }
  };

  const filterEmployees = (e)=>{
    const records = employees.filter((emp)=>{
      return emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setfilteredEmployees(records)
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      {empLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by Emp Name"
              onChange={filterEmployees}
              className="px-4 py-0.5 border bg-white"
            />
            <Link
              to="/admin-dashboard/add-employee"
              className="px-4 py-1 bg-teal-600 hover:bg-teal-700 rounded text-white"
            >
              Add New Employee
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={empColumns} data={filteredEmployees} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default List;
