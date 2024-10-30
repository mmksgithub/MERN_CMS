// /src/routes/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access to the route
  return children;
};

export default ProtectedRoute;
