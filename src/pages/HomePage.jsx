import HeroSection from "../components/HeroSection"

function HomePage(){
    return (
        <>
            <HeroSection 
               title="Food Web"
               image="/assets/pictures/HomePageImage.webp"
            />

            {/* Main Content Area */}
            <div class="main-content">
                {/* Mission Section */}
                <section class="mission-section">
                    <h2 class="mission-title">Our Mission</h2>
                    <p class="mission-description">
                        Food Web is an initiative dedicated to connecting communities with their local food systems and building a network of local producers, gardeners, distributors, volunteers, and community members.
                    </p>
                              
                    <h3 class="priorities-title">Our Priorities</h3>
                    <ul class="priorities-list">
                        <li>Increase access to local fresh food</li>
                        <li>Reduce food miles & uplift local producers</li>
                        <li>Combat food waste and food insecurity</li>
                        <li>Increase engagement in the local food system & volunteer turnout at community gardens</li>
                        <li>Facilitate resource-sharing and collaboration among farmers, gardeners, farmers markets, and food banks
                        </li>
                        <li>Educate the community about sustainable food systems and regenerative farming</li>
                    </ul>
                </section>
            </div>
        </>
    );
}

export default HomePage;