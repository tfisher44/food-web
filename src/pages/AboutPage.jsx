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
                <p>Food Web began with two ASU students and passionate gardeners who started volunteering at Encounter Farm and soon found a home in the community, land, and fresh produce that it offered. Curious about how many other community gardens were hiding in plain sight, they set out to discover as many as possible and quickly realized that there were dozens nearby, if only one knew where to look. Troubled by food deserts, food waste, and a food system that has largely overlooked local producers and the power of community, they set out to make a difference. With just a handful of ideas and a vision for a better future, they entered their project into the EPICS (Engineering Projects in Community Service) program at ASU. Two teams were formed: the Food Team, to build a water storage and drip irrigation system for Encounter Farm, and the Web Team, to develop this platform to help connect communities with their local food systems. Like a seed planted in soil, with time, care, and collaboration, the Food Web began to grow.</p>
            </div>
            
            {/* TODO: Style & format the below content */}
            {/* <div id="community-partners">
            <h2>Community Partners</h2>
                <h3>Encounter Farm</h3>
                    <p>Description of Encounter Farm</p>
                    <p>TODO: Format as profiles horizontally with headshots, names, and bios</p>
                    <ul>
                        <li>Bonnie</li>
                        <li>Patty</li>
                        <li>Jason</li>
                    </ul>
            </div>

            <div id="teams">
                <h2>Food Web Teams</h2>
                <h3>Web Team</h3>
                    <p>The Web team develops the Food Web website. We are a group of computer science students at ASU.</p>
                    <p>TODO: Format as profiles horizontally with headshots, names, and bios</p>
                    <ul>
                        <li>Taylor Fisher (Founder)</li>
                        <li>Payge</li>
                        <li>Izzy</li>
                        <li>Rey</li>
                    </ul>

                <h3>Food Team</h3>
                    <p>The Food team works on the irragation system at Encounter Farm. We are a group of engineering students at ASU.</p>
                    <p>TODO: Format as profiles horizontally with headshots, names, and bios</p>
                    <ul>
                        <li>Teresa Terroba Rivero (Founder)</li>
                        <li>Jake Cummins</li>
                        <li>Christian Graeff</li>
                        <li>Hormando</li>
                        <li>Manuel</li>
                        <li>Jack</li>
                        <li>Mahima</li>
                    </ul>
            </div> */}
        </>
    );
}

export default AboutPage;