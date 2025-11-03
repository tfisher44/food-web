import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./UpdatePassword.css"

export default function UpdatePassword() {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function updatePassword() {
        await supabase.auth.updateUser({ password: password });
        navigate("/login");
    }

    return (
        <form className="update-password-form"
      onSubmit={async (e) => {
          e.preventDefault();
          await updatePassword();
      }}>
          <h2>Enter your new password</h2>
          
          <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Update Password</button>
      </form>
    )
}