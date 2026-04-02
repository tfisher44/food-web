import "./ResetEmailPassword.css"
import { useState } from "react";
import { resetPassword } from "../services/authService"

export default function ResetEmailPassword(){
    const [email, setEmail] = useState("");

    async function resetPasswordFromEmail() {
        try{
            // call resetPassword and alert the user to check their email to complete the process
            await resetPassword(email);
            alert("Please check your email");
        } catch(error) {
            console.log("Error sending reset password email: ", error);
            alert("Error sending reset password email");
        }
    }

    return (
        <form className="reset-email-password-form"
      onSubmit={async (e) => {
          e.preventDefault();
          await resetPasswordFromEmail();
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