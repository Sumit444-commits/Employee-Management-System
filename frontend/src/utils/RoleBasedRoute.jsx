import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../Context/authContext";
const RoleBasedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuthStore();
  if (loading) {
    return <div> Loading ... </div>;
  }
  if(!requiredRole.includes(user.role)){
    <Navigate to={"/unauthorized"}/>
  }

   return user ? children : <Navigate to={"/login"} />
 
};

export default RoleBasedRoute;
