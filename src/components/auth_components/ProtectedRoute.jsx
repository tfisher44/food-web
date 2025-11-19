import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"

function ProtectedRoute({ children }) {
    const { session } = useAuth();

    if (!session) {
        return <Navigate to="/login" replace />
    }
    return children;
}

export default ProtectedRoute;