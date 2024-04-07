import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUserHook } from "../../hooks/useUserHook";

const RequireAuth = () => {
  const location = useLocation();
  const { user } = useUserHook()

  return user
    ? <Outlet />
    : <Navigate to="/" state={{ from: location }} replace />
};

export default RequireAuth;