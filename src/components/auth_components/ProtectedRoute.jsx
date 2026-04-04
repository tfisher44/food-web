import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"

function ProtectedRoute({ children }) {
    const { session, isLoading } = useAuth();

    // Wait for session to load from Supabase
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <Navigate to="/login" replace />
    }
    return children;
}

export default ProtectedRoute;