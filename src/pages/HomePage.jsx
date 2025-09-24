// import components
import HeroSection from "../components/HeroSection"
import './HomePage.css';

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

                {/* Buttons Section */}
    <div class="buttons-section">
      <a href="../MapPage.jsx" class="styled-button">
        <img src="assets/location-icon.svg" alt="Location icon" class="button-icon"></img>
        <span>Explore Your Local Food System</span>
      </a>

      <a href="./Connect-Page/connect.html" class="styled-button">
        <img src="assets/tools-icon.svg" alt="Tools icon" class="button-icon"></img>
        <span>Attend Events & Workshops</span>
      </a>

      <a href="./Educate-Page/educate.html" class="styled-button">
        <img src="assets/produce-icon.svg" alt="Education icon" class="button-icon"></img>
        <span>Learn About Sustainable Gardening</span>
      </a>
      <a href="https://join.slack.com/t/food-web/shared_invite/zt-30ngo8ktg-AedgakrlhhP~nrNAZXPChw"
        class="slack-button">
        <img src="assets/slack-new-logo.svg" alt="Slack icon" class="button-icon"></img>
        <span>Join Our Slack Community</span>
      </a>
    </div>
            </div>
        </>
    );
}

export default HomePage;