import { useState, useEffect } from "react";
import SignIn from "../components/auth_components/SignIn"
import SignUp from "../components/auth_components/SignUp"
import { useNavigate } from "react-router-dom"
import "./AuthPage.css"
import { checkSiteManager } from "../services/authService"

// this page manages the sign-in and sign-out components

export default function AuthPage({session}) {
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate(); 

  // TODO: make this redirect function work when reloading the page
  useEffect(() => {
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
      accountRedirect();
  }, [session, navigate]);

  return (
    <div className="auth-container">
      {showSignUp? (<SignUp onSignUpSuccess={() => setShowSignUp(false)}/>) : (<SignIn />)}

      <button className="switch-btn" onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>
    </div>
  )
}
