import { useState, useEffect } from "react";
import SignIn from "../components/auth_components/SignIn"
import SignUp from "../components/auth_components/SignUp"
import "./AuthPage.css"

// this page manages the sign-in and sign-out components
export default function AuthPage({session}) {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="auth-container">
      {showSignUp? (<SignUp onSignUpSuccess={() => setShowSignUp(false)}/>) : (<SignIn />)}

      <button className="switch-btn" onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>
    </div>
  )
}
