/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode token
  const userRole = decodedToken.role; // Dapatkan role dari token

  // Jika role tidak sesuai dengan requiredRole, redirect ke halaman yang berbeda (misalnya home)
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
