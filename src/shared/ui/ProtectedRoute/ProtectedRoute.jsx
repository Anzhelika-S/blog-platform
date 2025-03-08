import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate replace to="/sign-in" />;
};

export default ProtectedRoute;
