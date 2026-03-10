import { Navigate } from "react-router-dom";

function ProtectedRoute({ role, userRole, children }) {
  if (role !== userRole) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
