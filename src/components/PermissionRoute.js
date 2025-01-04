import React from "react";
import { Navigate } from "react-router-dom";

const PermissionRoute = ({ children, permission }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userPermissions = userData?.permissions || [];

  // Check if the user has the required permission
  if (!userPermissions.includes(permission)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PermissionRoute;
