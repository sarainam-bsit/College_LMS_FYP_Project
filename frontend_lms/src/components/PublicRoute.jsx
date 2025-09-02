// PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  if (isLoggedIn) {
    // Redirect based on role
    if (userRole === "admin") return <Navigate to="/adminhome" replace />;
    if (userRole === "teacher") return <Navigate to="/teacherdashboard" replace />;
    if (userRole === "student") return <Navigate to="/home" replace />;
  }

  return children;
}

export default PublicRoute;
