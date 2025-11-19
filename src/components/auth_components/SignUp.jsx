import { useState } from "react";
import { supabase } from "../../supabaseClient";
import "./SignUp.css"

export default function SignUp({onSignUpSuccess}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            display_name: name,
          },
        },
    });

    if (error) {
        alert(error.message);
    } else {
        if (onSignUpSuccess) {
          onSignUpSucess();
          alert("Please check your email & follow link to finish account registration")
        };
    }
}

  // input validation is provided in Supabase settings for email and password
  return (
    <form className="signup-form"
    onSubmit={async (e) => {
        e.preventDefault();
        await signUpNewUser();
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