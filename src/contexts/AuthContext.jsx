import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);

    useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // listen for changes in authentication
    const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
    })

    return () => subscription.unsubscribe();

  }, []);

  return (
    <AuthContext.Provider value={{session}}>
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context == undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}