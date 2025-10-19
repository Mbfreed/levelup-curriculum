import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useUser();
  // const location = useLocation();

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRoute;
