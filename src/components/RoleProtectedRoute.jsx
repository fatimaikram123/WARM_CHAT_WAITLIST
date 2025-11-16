// src/components/RoleProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useRole } from "../hooks/useRole";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { roleId } = useRole();

  if (!allowedRoles.includes(roleId)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
