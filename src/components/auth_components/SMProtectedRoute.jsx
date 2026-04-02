// wrapper for page routes that only site managers should have access to
import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { checkSiteManager } from "../../services/authService"

function SMProtectedRoute({ children }) {
    const { session } = useAuth();
    const [siteManager, setSiteManager] = useState(null);

    useEffect(() => {
        async function checkRole() {
            try {
                if(!session) {
                    setSiteManager(false);
                    return;
                }
                // call the checkSiteManager from authService
                const isSiteManager = await checkSiteManager(session.user.id);
                setSiteManager(isSiteManager);
            } catch (error){
                console.log(error);
            }
        }
        checkRole();
    }, [session])

    if (siteManager == null) {
        return <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100bh",
        }}
        >Loading...</div>
    }
    else if (!siteManager) {
        return <Navigate to="/login" replace />
    }
    return children;
}

export default SMProtectedRoute;