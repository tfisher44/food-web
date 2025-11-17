import { useState, useEffect } from "react";
import SignIn from "../components/auth_components/SignIn"
import SignUp from "../components/auth_components/SignUp"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"
import "./AuthPage.css"

// this page manages the sign-in and sign-out components

export default function AuthPage({session}) {
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate(); 

  // TODO: make this redirect function work when reloading the page
  useEffect(() => {
      async function accountRedirect(){
          if (session) {
              // check if user id in site_managers table, then redirect to correct user page
              const userID = session.user.id;
              const { data: siteManager, error } = await supabase.from("site_managers").select("user_id").eq("user_id", userID).single();

              if(siteManager) {
                  navigate("/site-manager-page");
              } else {
                  navigate("/community-member-page");
              }

              if (error) {
                  console.log("Error checking site_managers", error)
              }
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
