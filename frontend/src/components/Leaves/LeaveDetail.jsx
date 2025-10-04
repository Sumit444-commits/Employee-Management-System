import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../Context/authContext";
import axios from "axios";
import { useEffect } from "react";

const LeaveDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { Api } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${Api}/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setData(response.data.leave);
        }
      } catch (error) {
        if (error.response && error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveDetails();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `${Api}/api/leave/detail/status-update/${id}`,{status},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
        
      if (error.response && error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-8 mt-10 rounded shadow-md">
          <h2 className="text-2xl mb-8 font-bold text-center">Leave Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`${Api}/uploads/${data?.employeeId.userId.profileImage}`}
                alt="profile"
                className="rounded-full border w-72"
              />
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name: </p>
                <p className="font-medium">{data?.employeeId.userId.name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Employee ID: </p>
                <p className="font-medium">{data?.employeeId.employeeId}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Leave Type: </p>
                <p className="font-medium">{data?.leaveType}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Reason: </p>
                <p className="font-medium">{data?.reason}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Department: </p>
                <p className="font-medium">
                  {data?.employeeId.department.dep_name}
                </p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Start Date: </p>
                <p className="font-medium">
                  {new Date(data?.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">End Date: </p>
                <p className="font-medium">
                  {new Date(data?.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">
                  {data.status === "Pending" ? "Actions" : "Status"}
                </p>
                {data.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button
                      className="px-2 py-0.5 bg-teal-300 hover:bg-teal-400"
                      onClick={() => changeStatus(data._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="px-2 py-0.5 bg-red-300 hover:bg-red-400"
                      onClick={() => changeStatus(data._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="font-medium">{data?.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveDetail;
