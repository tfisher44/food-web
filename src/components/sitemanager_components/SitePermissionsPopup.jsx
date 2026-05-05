import { useEffect, useState } from "react"
import { invite_site_manager, get_site_managers_by_siteId } from "../../services/siteManagementService"
import "./SitePermissionsPopup.css"

export default function SitePermissionsPopup({onClose, siteID, siteName}) {
    const [showInviteEmail, setShowInviteEmail] = useState(false);
    const [showInviteButton, setShowInviteEmailButton] = useState(true);
    const [email, setEmail] = useState("");
    const [siteManagers, setSiteManagers] = useState([]);

    // get all site managers of the same site
    async function get_site_managers(){
        try {
            const site_managers = await get_site_managers_by_siteId();
            setSiteManagers(site_managers);
        } catch (error) {
            alert(`Error getting site managers: ${error.message}`);
        }
    }

    useEffect(() => {
        if (siteID) {
            get_site_managers();
        }
    }, [siteID])

    // send invite to grant site permissions to another user
    async function invite_SM(email, siteID){
        try {
            await invite_site_manager(email, siteID);
            alert("Invite sent!");
        } catch (error) {
            alert(`Invite failed: ${error.message}`);
        }
    }

    return (
            <div className="permissions-popup-overlay">
            <span className="permissions-close-btn" onClick={onClose}>x</span>

                <div className="permissions-popup-content">
                <h2>Site Managers for Encounter Farm:</h2>

                {siteManagers.map((manager) => (
                    <div key={manager.user_id}>
                        {manager.display_name} — {manager.email}
                    </div>
                ))}

                {showInviteButton &&
                    <button className="invite-SM-button" type="button" onClick={() => {setShowInviteEmail(true); setShowInviteEmailButton(false)}}>Invite a user to manage your site</button>
                }

                {showInviteEmail &&
                    <div className="invite-SM-popup">
                        <span id="invite-popup-close" onClick={() => {setShowInviteEmail(false); setShowInviteEmailButton(true)}}>x</span>
                        <h3>Enter recipient email:</h3>
                        <input id="email_input" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <button className="invite-SM-button" onClick={() => {invite_SM(email, siteID)}}>Send Invite</button>
                    </div>
                }
            </div>
        </div>
    )
}