import { Routes, Route } from "react-router-dom"
import {AuthProvider} from "./contexts/AuthContext"
import AppLayout from "./components/AppLayout"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import MapPage from "./pages/MapPage"
import CalendarPage from "./pages/CalendarPage"
import EducatePage from "./pages/EducatePage"
import ProjectsPage from "./pages/ProjectsPage"
import AuthPage from "./pages/AuthPage"
import CommunityMemberPage from "./pages/CommunityMemberPage"
import SiteManagerPage from "./pages/SiteManagerPage"
import ResetEmailPassword from "./pages/ResetEmailPassword"
import UpdatePassword from "./pages/UpdatePassword"
import ProtectedRoute from "./components/auth_components/ProtectedRoute"
import SMProtectedRoute from "./components/auth_components/SMProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <AppLayout >
        <Routes>
          {/* main pages: */}
          <Route path="/" element={<HomePage />} />
          <Route path="/map-page" element={<MapPage />} />
          <Route path="/about-page" element={<AboutPage/>}/>
          <Route path="/calendar-page" element={<CalendarPage />} />
          {/* <Route path="/projects-page" element={<ProjectsPage />} />
          <Route path="/educate-page" element={<EducatePage />} /> */}
          {/* auth pages: */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/reset-email-password" element={<ResetEmailPassword />} />
          <Route path="/change-password" element={<UpdatePassword />} />
          <Route path="/community-member-page" element={<ProtectedRoute ><CommunityMemberPage /></ProtectedRoute>} />
          <Route path="/site-manager-page" element={<ProtectedRoute ><SMProtectedRoute ><SiteManagerPage /></SMProtectedRoute></ProtectedRoute>} />
        </Routes>
      </AppLayout>
    </AuthProvider>
  )
}

export default App