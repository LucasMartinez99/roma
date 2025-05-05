import { Navigate } from "react-router-dom";
import { logout } from "./services/authService";

export function ProtectedRoute({ children }) {
    const token = localStorage.getItem("access_token");

    if (!token) {
        logout();
        return <Navigate to="/" replace />;
    }

    return children;
}
