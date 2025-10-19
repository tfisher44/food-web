import { useState } from "react";
import SignIn from "../components/auth_components/SignIn"
import SignUp from "../components/auth_components/SignUp"

export default function AuthPage() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div>
      {showSignUp? (<SignUp onSignUpSucess={() => setShowSignUp(false)}/>) : (<SignIn />)}

      <button onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>
    </div>
  )
}
