import "./ProfileMenu.css"
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { checkSiteManager, signOut } from "../services/authService"

export default function ProfileMenu() {
    const { session } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // close the menu when user clicks on another page
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    async function signOutUser() {
        try {
            // sign out user and navigate to the home page
            await signOut();
            navigate("/");
        } catch (error) {
            console.log("Error signing out: ", error);
            alert("Error signing out");
        }
    }

    // QUESTION: should I put this function elsewhere to reuse in AuthPage?
    async function accountRedirect() {
        try {
            if (session) {
                // check if user id in site_managers table, then redirect to correct user page
                const userID = session.user.id;
                const isSiteManager = await checkSiteManager(userID);
                navigate(isSiteManager ? "/site-manager-page" : "/community-member-page");
            }
        } catch(error) {
            console.log(error);
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
                        <button className="profile-menu-btn" id="signOut-btn" type="button" onClick={async (e) => {await signOutUser()}}>Sign Out</button>
                        <button className="profile-menu-btn" id="account-btn" type="button" onClick={async (e) => {await accountRedirect()}}>My Account</button>
                    </>
                )}
            </div>
            }
        </div>
    )
}