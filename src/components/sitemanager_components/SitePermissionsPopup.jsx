import { supabase } from "../../supabaseClient"
import { useState, useEffect } from "react"
import "./SitePermissionsPopup.css"

export default function SitePermissionsPopup({onClose, siteID}) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>x</span>
                <h2>Site Managers for Encounter Farm:</h2>
                <button id="grant-permissions-btn" type="button">Grant Site Permissions to Another User</button>
            </div>
        </div>
    )
}