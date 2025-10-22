import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function SignUp({onSignUpSucess}) {
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
        if (onSignUpSucess) {
          onSignUpSucess();
          alert("Please check your email & follow link to finish account registration")
        };
    }
}

  return (
    <form className="sigin-form"
    onSubmit={async (e) => {
        e.preventDefault();
        await signUpNewUser();
    }}
        >
        <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        
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

        <button type="submit">Create Account</button>
    </form>
  )
}