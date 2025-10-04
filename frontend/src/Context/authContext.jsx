import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create the userContext
export const userContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const Api = import.meta.env.VITE_API;

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${Api}/api/auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  // Example login function
  const login = (user) => {
    setUser(user);
  };

  // Example logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{Api, user, login, logout,loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuthStore = () => {
  return useContext(userContext);
};
