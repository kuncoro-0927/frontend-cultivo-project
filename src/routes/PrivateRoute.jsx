/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { instance } from "../utils/axios";
const PrivateRoute = ({ children, requiredRole }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  const checkTokenValidity = async () => {
    try {
      const response = await instance.get("/verify-token");

      if (response.status === 200) {
        const userData = response.data.user;
        setIsAuthenticated(true);
        setUserRole(userData.role);

        if (requiredRole && userData.role !== requiredRole) {
          throw new Error("Role tidak sesuai");
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error validasi token:", error);
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
