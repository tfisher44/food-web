import { useState } from "react";
import { signUpNewUser } from "../../services/authService"
import "./SignUp.css"

export default function SignUp({onSignUpSuccess}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSignUp() {
    try {
      await signUpNewUser(email, password, name);
      alert("Please check your email & follow link to finish account registration");
      onSignUpSuccess?.();
    } catch (error) {
      alert(error.message);
    }
  }

  // input validation is provided in Supabase settings for email and password
  return (
    <form className="signup-form"
    onSubmit={async (e) => {
        e.preventDefault();
        await handleSignUp();
    }}>
        <h2>Create a new account</h2>

        <p>Name</p>
        <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        
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

        <button type="submit">Create Account</button>
    </form>
  )
}