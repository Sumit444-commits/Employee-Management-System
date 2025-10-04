import React from "react";
import { useAuthStore } from "../../Context/authContext";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <div className="flex justify-between items-center text-white bg-teal-600 h-16 px-8">
      <p className="text-xl">Welcome, {user.name}</p>
      <button
        className="px-4 py-1 bg-teal-700 hover:bg-teal-800"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
