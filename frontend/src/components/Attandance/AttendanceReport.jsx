import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../Context/authContext";

const AttendanceReport = () => {
  const { Api } = useAuthStore();

  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [filterDate, setFilterDate] = useState();
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ limit, skip });
      if (filterDate) {
        query.append("date", filterDate);
      }
      const response = await axios.get(
        `${Api}/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        if (skip == 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => ({
            ...prevData,
            ...response.data.groupData,
          }));
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  useEffect(() => {
    fetchReport();
  }, [skip, filterDate]);
  return (
    <div className="min-h-screen p-10 bg-white">
      <h2 className="text-center text-2xl font-bold">Attendence Report</h2>
      <div>
        <h2 className="text-xl font-semibold">Filter by Date: </h2>
        <input type="date" className="border bg-gray-100" onChange={(e)=>{
          setFilterDate(e.target.value)
          setSkip(0)
        }} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        Object.entries(report).map(([date, record]) => (
          <div key={date} className="mt-4 border-b">
            <h2 className="text-xl font-semibold">{date}</h2>
            <table className="" border="5" cellPadding="10" cellSpacing="5">
              <thead>
                <tr>
                  <th>S. No. </th>
                  <th>EmployeeId</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {record.map((data, i) => (
                  <tr key={data.employeeId}>
                    <td>{i + 1}</td>
                    <td>{data.employeeId}</td>
                    <td>{data.employeeName}</td>
                    <td>{data.departmentName}</td>
                    <td>{data.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
      <button
        className="px-4 py-2 border bg-gray-100 text-lg font-semibold"
        onClick={handleLoadMore}
      >
        Load More
      </button>
    </div>
  );
};

export default AttendanceReport;
