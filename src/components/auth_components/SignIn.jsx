import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectPage, setRedirectPage] = useState("");
  const navigate = useNavigate();

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
  }

  // TODO: function to set the redirect page

  return (
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

        <button type="submit" onClick={() => navigate("/community-member-page")}>Sign In</button>
    </form>
  )
}
