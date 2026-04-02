import { useState } from "react";
import { signInWithEmail, checkSiteManager } from "../../services/authService"
import { useNavigate } from "react-router-dom"
import "./SignIn.css"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignIn() {
    try {
      const user = await signInWithEmail(email, password);
      const isSiteManager = await checkSiteManager(user.id);
      navigate(isSiteManager ? "/site-manager-page" : "/community-member-page");
    } catch (error) {
      alert(error.message);
    }
  }

  // input validation is provided in Supabase settings for email and password
  return (
      <form className="signin-form"
      onSubmit={async (e) => {
          e.preventDefault();
          await handleSignIn();
      }}>
          <h2>Login to your account</h2>
          
          <p>Email</p>
          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

          <p>Password</p>
          <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit">Login</button>

          <button className="reset-password-link" type="button" onClick={() => navigate("/reset-email-password")}><u>Forgot your password?</u></button>
      </form>
  )
}