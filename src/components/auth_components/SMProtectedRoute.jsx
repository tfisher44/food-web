// wrapper for page routes that only site managers should have access to
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function SMProtectedRoute({ session, children }) {
    const [siteManager, setSiteManager] = useState(null);

    useEffect(() => {
        async function checkRole() {
            if(!session) {
                setSiteManager(false);
                return;
            }
            const userID = session.user.id;
            const { data, error } = await supabase.from("site_managers").select("user_id").eq("user_id", userID).single();
            
            if (data && !error) {
                setSiteManager(true);
            }
            else {
                setSiteManager(false);
            }
        }

        checkRole();
    }, [session])

    if (siteManager == null) {
        return <div>Loading...</div>
    }
    else if (!siteManager) {
        return <Navigate to="/login" replace />
    }
    return children;
}

export default SMProtectedRoute;