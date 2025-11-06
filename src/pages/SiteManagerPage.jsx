import { supabase } from "../supabaseClient"
import { useState, useEffect } from "react"
import "./SiteManagerPage.css"

function SiteManagerPage({session}) {
    const [siteName, setSiteName] = useState("");
    const [siteID, setSiteID] = useState(null);
    const dispalyName = session.user.user_metadata.display_name;

    useEffect(() => {
        async function get_site_data(){
            const userID = session.user.id;
            const { data: site, error: site_manager_error } = await supabase.from("site_managers").select('*').eq("user_id", userID);

            if (site_manager_error) {
                console.error("Error getting site manager data", site_manager_error);
            }

            setSiteID(site[0].site_id)
            const site_id = site[0].site_id;
            const { data: site_data, error: site_error } = await supabase.from("all_sites").select('*').eq("id", site_id);

            if (site_error) {
                console.error("Error getting site data", site_error);
            }

            setSiteName(site_data[0].name);
        }

        get_site_data();
    }, [session])

    return (
        <div className="SM-page-content">
            <h1>Hello {dispalyName}!</h1>
            <h3>Role: Site Manager</h3>
            <h3>My site: {siteName}</h3>

            {/* create components for each popup and pass siteID as a parameter*/}
            <button type="button">Update Available Produce</button> 
            <button type="button">Edite Site Profile Information</button>
        </div>
    )
}

export default SiteManagerPage