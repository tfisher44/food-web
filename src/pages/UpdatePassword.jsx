import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./UpdatePassword.css"
import { updatePassword } from "../services/authService"

export default function UpdatePassword() {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function updateUserPassword() {
        try {
            // update the password
            await updatePassword(password);
            // if successful, navigate to the login page
            alert("Password updated successfully!");
            navigate("/login");
        } catch(error) {
            alert("Error updating password: ");
            console.log("Error updating password: ", error);
        }
    }

    return (
        <form className="update-password-form"
      onSubmit={async (e) => {
          e.preventDefault();
          await updateUserPassword();
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