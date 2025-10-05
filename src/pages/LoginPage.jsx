import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from "../supabaseClient";

function LoginPage() {
    return (
        <div className="auth-container">
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        </div>
    )
}

export default LoginPage