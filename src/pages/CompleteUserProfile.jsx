import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { updatePassword, updateDisplayName } from "../services/authService"

export default function CompleteUserProfile(){
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    async function completeUserProfile() {
        try {
            // update the password
            await updatePassword(password);

            // update the display name
            await updateDisplayName(name);

            // if successful, navigate to the login page
            alert("Profile completed!");
            navigate("/login");
        } catch(error) {
            alert("Error updating profile: ");
            console.log("Error updating profile: ", error);
        }
    }

    return (
        <form className="update-password-form"
      onSubmit={async (e) => {
          e.preventDefault();
          await completeUserProfile();
      }}>
          <h2>Complete your user profile:</h2>

          <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          
          <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Complete Sign-Up</button>
      </form>
    )
}