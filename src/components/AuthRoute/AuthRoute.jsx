import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useUser();
  const location = useLocation();

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRoute;
