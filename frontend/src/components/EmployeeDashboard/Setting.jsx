import React, { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const { Api, user } = useAuthStore();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        setting.oldPass === "" ||
        setting.newPass === "" ||
        setting.confirmPass === ""
      ) {
        setError("Fill All Fields Properly");
        return;
      }
      if (setting.newPass !== setting.confirmPass) {
        setError("Password doesn't match");
        return;
      }
      const response = await axios.put(
        `${Api}/api/setting/change-password`,
        setting
      );
      if (response.data.success) {
        setSetting({
          userId: user._id,
          oldPass: "",
          newPass: "",
          confirmPass: "",
        });
      }
    } catch (error) {
      if (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.message);
        } else {
          setError("Server Error");
        }
      }
      console.log(error);
    }
  };

  return (
    <div
      className={`max-w-3xl mx-auto mt-10 bg-white w-96 shadow-md rounded-md`}
    >
      <div className="bg-white  border shadow p-4 w-96 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800">
              Old Password
            </label>
            <input
              name="oldPass"
              type="password"
              onChange={handleChange}
              value={setting.oldPass}
              placeholder="Old Password"
              autoComplete="off"
              className="w-full px-3 py-2 border"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              New Password
            </label>
            <input
              name="newPass"
              type="password"
              onChange={handleChange}
              value={setting.newPass}
              placeholder="New Password"
              autoComplete="off"
              className="w-full px-3 py-2 border"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              Confirm Password
            </label>
            <input
              name="confirmPass"
              type="password"
              onChange={handleChange}
              value={setting.confirmPass}
              placeholder="Confirm Password"
              autoComplete="off"
              className="w-full px-3 py-2 border"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
