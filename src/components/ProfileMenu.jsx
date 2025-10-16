import "./ProfileMenu.css"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function ProfileMenu({session}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="profile-menu-container">
            <button className="profile-btn" type="button" onClick={() => setMenuOpen((prev) => !prev)}>
                <img src="/assets/icons/profile-girl-icon.svg" alt="Profile"/>
            </button>

            {menuOpen &&
            <div className="menu-container">
                <button className="signIn-btn" type="button" onClick={() => navigate("/login")}>Sign-In</button>
                <button className="account-btn" type="button">My Account</button>
                <p>Sign in to manage your site</p>
            </div>
            }
        </div>
    )
}

export default ProfileMenu;