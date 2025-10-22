import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

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
    <div>
      <form className="sigin-form"
      onSubmit={async (e) => {
          e.preventDefault();
          await signInWithEmail();
      }}
          >
          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

          <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
