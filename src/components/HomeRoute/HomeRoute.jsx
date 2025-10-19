import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const HomeRoute = () => {
  const { isAuthenticated } = useUser();

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is not authenticated, redirect to landing page
  return <Navigate to="/landing" replace />;
};

export default HomeRoute;
