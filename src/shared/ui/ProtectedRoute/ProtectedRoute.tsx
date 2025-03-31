import React, { ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute : React.FC<ProtectedRouteProps>= ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate replace to="/sign-in" />;
};

export default ProtectedRoute;
