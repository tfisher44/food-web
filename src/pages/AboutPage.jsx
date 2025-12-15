// import components
import HeroSection from "../components/HeroSection"
import "./AboutPage.css"

function AboutPage(){
    return (
        <>
            <HeroSection 
               title="About Us"
               image="/assets/pictures/HomePageImage.webp"
            />
            <div id="our-story">
                <h1>Our Story</h1>
                <p>Food Web began with two ASU students and passionate gardeners who started volunteering at Encounter Farm and soon found a home in the community, land, and fresh produce that it offered. Curious about how many other community gardens were hiding in plain sight, they set out to discover as many as possible and quickly realized that there were dozens nearby, if only one knew where to look. Concerned about food deserts, food waste, and a food system that has largely overlooked local producers and the power of community, they set out to make a difference. With just a handful of ideas and a vision for a better future, they entered their project into the EPICS (Engineering Projects in Community Service) program at ASU. Two teams were formed: the Food Team, to build a water storage and drip irrigation system for Encounter Farm, and the Web Team, to develop this platform to help connect communities with their local food systems. Like a seed planted in soil, with time, care, and collaboration, the Food Web began to grow.</p>
            </div>

            
            <div id="CP-section">
                <h1>Community Partners</h1>
                <h2>Encounter Farm</h2>
                <img src="assets\pictures\EncounterFarmVolunteers.webp" alt="Encounter Farm Community Partners"></img>
                <p>Encounter Farm is a volunteer-run community garden located in Mesa, Arizona on a plot of land owned by Encounter Church. Bonnie, Patty, and Jason are the primary volunteers. Their goal is to grow healthy, nourishing food to share with the volunteers, local community, and food bank at Encounter Church. Beyond the crops, the farm also serves as a sanctuary for volunteers, nearby residents, and students to reconnect with the land, learn how to grow food, gain access to fresh produce, and build community.</p>
            </div>

        </>
    );
}

export default AboutPage;