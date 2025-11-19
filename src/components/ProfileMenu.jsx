import "./ProfileMenu.css"
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { supabase } from "../supabaseClient"
import { useAuth } from "../contexts/AuthContext"

function ProfileMenu() {
    const { session } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // close the menu when user clicks on another page
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        navigate("/");
    }

    async function accountRedirect() {
        if (session) {
            // check if user id in site_managers table, then redirect to correct user page
            const userID = session.user.id;

            const { data: siteManager, error: siteManagerError } = await supabase.from("site_managers").select("user_id").eq("user_id", userID).single();

            if(!siteManager || siteManagerError) {
                navigate("/community-member-page");
            } else if (siteManager) {
                navigate("/site-manager-page");
            }
        }
    }

    return (
        <div className="profile-menu-container">
            <button className="profile-btn" type="button" onClick={() => setMenuOpen((prev) => !prev)}>
                <img src="/assets/icons/profile-girl-icon.svg" alt="Profile"/>
            </button>

            {menuOpen &&
            <div className="menu-container">
                {!session &&
                    <>
                        <button className="profile-menu-btn" id="signIn-btn" type="button" onClick={() => navigate("/login")}>Sign-In</button>
                        <p>Sign in to manage your site</p>
                    </>
                }
                {session && (
                    <>
                        <button className="profile-menu-btn" id="signOut-btn" type="button" onClick={async (e) => {await signOut()}}>Sign Out</button>
                        <button className="profile-menu-btn" id="account-btn" type="button" onClick={async (e) => {await accountRedirect()}}>My Account</button>
                    </>
                )}
            </div>
            }
        </div>
    )
}

export default ProfileMenu;