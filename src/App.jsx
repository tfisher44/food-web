import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./components/AppLayout"
import HomePage from "./pages/HomePage"
import MapPage from "./pages/MapPage"
import CalendarPage from "./pages/CalendarPage"
import EducatePage from "./pages/EducatePage"
import ProjectsPage from "./pages/ProjectsPage"

function App() {

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map-page" element={<MapPage />} />
          <Route path="/calendar-page" element={<CalendarPage />} />
          <Route path="/projects-page" element={<ProjectsPage />} />
          <Route path="/educate-page" element={<EducatePage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
