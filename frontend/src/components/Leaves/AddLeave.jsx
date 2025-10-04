import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Context/authContext";

const AddLeave = () => {
  const navigate = useNavigate();
  const { Api,user } = useAuthStore();

  const [leave, setLeave] = useState({
    userId : user._id,
    leaveType: "",
    startDate:"",
    endDate:"",
    reason:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave({ ...leave, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${Api}/api/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              name="leaveType"
              required
              value={leave.leaveType}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>
          <div className="flex flex-row gap-4">
            {/* From Date */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                value={leave.startDate}
                onChange={handleChange}
                placeholder="From Date"
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* End Date */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={leave.endDate}
                onChange={handleChange}
                placeholder="End Date"
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              name="reason"
              onChange={handleChange}
              placeholder="Reason"
              value={leave.reason}
              required
              className="px-2 w-full border border-gray-300"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
