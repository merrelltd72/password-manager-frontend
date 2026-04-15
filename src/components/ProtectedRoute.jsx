import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isAuthResolved } = useAuthState();
  const location = useLocation();

  if (!isAuthResolved) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
