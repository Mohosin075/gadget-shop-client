import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

function SellerRoutes({ children }) {
  const role = useUserRole();

  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || !role) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (user && role === "seller") {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace />;
}

export default SellerRoutes;
