import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./ResetEmailPassword.css"

export default function ResetEmailPassword(){
    const [email, setEmail] = useState("");

    async function resetPassword() {
        const {error} = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5173/change-password', // TODO: change this to the current domain name and move to environment variables in Netlify
        });

        if (error) {
            alert("Error sending reset password email: " + error.message);
            return;
        }

        alert("Please check your email");
    }

    return (
        <form className="reset-email-password-form"
      onSubmit={async (e) => {
          e.preventDefault();
          await resetPassword();
      }}>
          <h2>Enter your Email</h2>
          
          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Send Reset Password Link</button>
      </form>
    )
}