import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ProtectedRoute = ({ children }) => {
  const { authData, loading } = useContext(AuthContext);

  // if (loading) return <div>Loading...</div>;
  if (loading) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <CircularProgress />
        </Box>
    );
  }

  return authData ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
