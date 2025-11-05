import { Navigate } from "react-router-dom";

function ProtectedRoute({ session, children }) {

    if (!session) {
        return <Navigate to="/login" replace />
    }
    return children;
}

export default ProtectedRoute;