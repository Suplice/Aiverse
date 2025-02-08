import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Utils/Context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: ("USER" | "MODERATOR" | "ADMIN")[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth/SignIn" replace />;
  if (!allowedRoles.includes(user.Role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
