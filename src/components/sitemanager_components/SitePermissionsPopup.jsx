import { useState } from "react"
import { invite_site_manager } from "../../services/siteManagementService"
import "./SitePermissionsPopup.css"

export default function SitePermissionsPopup({onClose, siteID}) {
    const [showInviteEmail, setShowInviteEmail] = useState(false);
    const [showInviteButton, setShowInviteEmailButton] = useState(true);
    const [email, setEmail] = useState("");

    // TODO: add table to view all site owners for the site
    // TODO: improve styling

    async function invite_SM(email, siteID){
        try {
            await invite_site_manager(email, siteID);
            alert("Invite sent!");
        } catch (error) {
            alert(`Invite failed: ${error.message}`);
        }
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>x</span>
                <h2>Site Managers for Encounter Farm:</h2>

                {showInviteButton &&
                    <button id="grant-permissions-btn" type="button" onClick={() => {setShowInviteEmail(true); setShowInviteEmailButton(false)}}>Invite a user to manage your site</button>
                }

                {showInviteEmail &&
                    <div className="invite-SM-popup">
                        <span id="invite-popup-close" onClick={() => {setShowInviteEmail(false); setShowInviteEmailButton(true)}}>x</span>
                        <h3>Enter recipient email:</h3>
                        <input id="email_input" onChange={(e) => setEmail(e.target.value)}></input>
                        <button onClick={() => {invite_SM(email, siteID)}}>Send Invite</button>
                    </div>
                }
            </div>
        </div>
    )
}