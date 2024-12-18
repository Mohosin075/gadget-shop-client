import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ReactNode } from "react";

function PrivateRoutes({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace />;
}

export default PrivateRoutes;
