import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authData, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return authData ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
