import React, { useState } from "react";
import axios from "axios"
import { useAuthStore } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
const defaultForm = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(defaultForm);
  const [error, setError] = useState(null)
  const {login} = useAuthStore()
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };  

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      if(formData.email === "" || formData.password === ""){
        console.log("Fill the form properly")
        return
      }
     const response = await axios.post(`${import.meta.env.VITE_API}/api/auth/login`,formData)
      if(response.data.success){
        login(response.data.user);
        localStorage.setItem("token",response.data.token)
        if(response.data.user.role === "admin"){
          navigate("/admin-dashboard")
        }else{
          navigate("/employee-dashboard")
        }
        alert("Login Successfull")
      }
      setFormData(defaultForm)
    } catch (error) {
      
      if(error){
        if(error.response && !error.response.data.success){
          setError(error.response.data.message)
        }else{
          setError("Server Error")
        }
      }
      console.log(error)
    }
  }


  return (
    <div
      className={`min-w-screen min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6`}
    >
      <h1 className="text-3xl text-white pacifico">
        Employee Management System
      </h1>
      <div className="bg-white  border shadow p-4 w-96 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={handleChange}
              value={formData.email}
              placeholder="Email"
              autoComplete="off"
              className="w-full px-3 py-2 border"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
               onChange={handleChange}
              value={formData.password}
              placeholder="Password"
              autoComplete="off"
              className="w-full px-3 py-2 border"
            />
          </div>
          <div className="mb-4 flex justify-between items-center">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-teal-600">
              Forget Password
            </a>
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

export default Login;
