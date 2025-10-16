import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import { supabase } from "./supabaseClient";
import AppLayout from "./components/AppLayout"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import MapPage from "./pages/MapPage"
import CalendarPage from "./pages/CalendarPage"
import EducatePage from "./pages/EducatePage"
import ProjectsPage from "./pages/ProjectsPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"

function App() {

  // user session
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
    <AppLayout session={session}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map-page" element={<MapPage />} />
        <Route path="/about-page" element={<AboutPage/>}/>
        <Route path="/calendar-page" element={<CalendarPage />} />
        <Route path="/projects-page" element={<ProjectsPage />} />
        <Route path="/educate-page" element={<EducatePage />} />

        {/* auth pages: */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </AppLayout>
  )
}

export default App
