import { supabase } from "../../supabaseClient"
import { useState, useEffect } from "react"
import "./SitePermissionsPopup.css"

export default function SitePermissionsPopup({onClose, siteID}) {
    const [showInvite, setShowInvite] = useState(false);

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>x</span>
                <h2>Site Managers for Encounter Farm:</h2>
                <button id="grant-permissions-btn" type="button" onClick={() => {setShowInvite(true)}}>Invite a user to manage your site</button>

                {showInvite &&
                    <div>
                        <span id="invite-popup-close" onClick={() => {setShowInvite(false)}}>x</span>
                        <h3>Enter recipient email:</h3>
                        <input></input>
                        <button>Send Invite</button>
                    </div>
                }
            </div>
        </div>
    )
}