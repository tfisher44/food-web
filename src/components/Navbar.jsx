import { Link } from "react-router-dom"
import "./Navbar.css"
import ProfileMenu from "./ProfileMenu";

function Navbar(){
    return (
        <nav className="navbar">
            {/* <h3 className="food-web-logo">Put Logo Here</h3> */}

            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/map-page">Map</Link></li>
                <li><Link to="/calendar-page">Calendar</Link></li>
                <li><Link to="/about-page">About</Link></li>
                {/* <li><Link to="/projects-page">Projects</Link></li>
                <li><Link to="/educate-page">Educate</Link></li> */}
            </ul>

            <div className="profile">
                <ProfileMenu />
            </div>
        </nav>
    );
}

export default Navbar;