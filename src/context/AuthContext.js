import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null); // Stores user data and token
  const [loading, setLoading] = useState(true); // To handle initial loading state

  const navigate = useNavigate();

  // Check for user authentication on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      setAuthData({ token, user: JSON.parse(userData) });
    }
    setLoading(false);
  }, []);

  // Handle login
  const login = (token, user) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(user));
    setAuthData({ token, user });
    navigate("/dashboard");
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setAuthData(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
