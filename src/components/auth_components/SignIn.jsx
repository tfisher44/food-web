import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error || !data.user) {
      alert(error?.message || "Login failed");
      return;
    }

    // check if user id in site_managers table, then redirect to correct user page
    const userID = data.user.id;

    const { data: siteManager, error: siteManagerError } = await supabase.from("site_managers").select("user_id").eq("user_id", userID).single();

    if(siteManager) {
      navigate("/site-manager-page");
    } else {
      navigate("/community-member-page");
    }

    if (siteManagerError) {
        console.log("Error checking site_managers", siteManagerError)
    }
  }

  return (
      <form className="signin-form"
      onSubmit={async (e) => {
          e.preventDefault();
          await signInWithEmail();
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

          <button type="submit">Login</button>
      </form>
  )
}
