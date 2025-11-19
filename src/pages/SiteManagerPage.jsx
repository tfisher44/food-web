import { supabase } from "../supabaseClient"
import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import "./SiteManagerPage.css"
import ProduceEditor from "../components/sitemanager_components/ProduceEditor"
import SiteProfileEditor from "../components/sitemanager_components/SiteProfileEditor"
import SitePermissionsPopup from "../components/sitemanager_components/SitePermissionsPopup"

function SiteManagerPage() {
    const { session } = useAuth();
    const [siteName, setSiteName] = useState("");
    const [siteID, setSiteID] = useState(null);
    const dispalyName = session.user.user_metadata.display_name;
    const [showProduceEditor, setShowProduceEditor] = useState(false);
    const [showSiteProfileEditor, setShowSiteProfileEditor] = useState(false);
    const [showSitePermissionsPopup, setShowitePermissionsPopup] = useState(false);

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
            <h2>Role: Site Manager</h2>
            <h2>My Site: {siteName}</h2>

            <button className="SM-btn" id="produce-editor-btn" type="button" onClick={() => setShowProduceEditor(true)}>Update Produce / Food / Products</button> 
            {showProduceEditor && <ProduceEditor onClose={() => setShowProduceEditor(false)} siteID={siteID}/>}

            <button className="SM-btn" id="profile-editor-btn" type="button" onClick={() => setShowSiteProfileEditor(true)}>Edit Site Profile Information</button>
            {showSiteProfileEditor && <SiteProfileEditor onClose={() => setShowSiteProfileEditor(false)} siteID={siteID}/>}

            <button className="SM-btn" id="permissions-btn" type="button" onClick={() => setShowitePermissionsPopup(true)}>Manage Site Permissions</button>
            {showSitePermissionsPopup && <SitePermissionsPopup onClose={() => setShowitePermissionsPopup(false)} siteID={siteID}/>}
        </div>
    )
}

export default SiteManagerPage