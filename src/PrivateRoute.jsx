import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode} from "jwt-decode"
const PrivateRoute = () => {
  const token = localStorage.getItem("UserToken");

return token ? <Outlet /> : <Navigate to="/login" />
};
export default PrivateRoute;

