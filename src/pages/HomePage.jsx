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
                <section class="main-content-section">
                    {/* What is Food Web Section */}
                    <h2 class ="whats-foodweb-title">What is Food Web?</h2>
                    <p class="whats-foodweb-description">
                        Food Web is a platform to connect communities with their local food systems through a network of local producers, distributors, volunteers, and community members.
                    </p>

                    {/* Mission Section */}
                    <h2 class="mission-title">Our Mission</h2>
                    <p class="mission-description">
                        Our mission is to increase access to locally grown fresh produce, inspire community engagement, support local growers, and facilitate collaboration in the food system. We aim to make it easy to find community gardens, start new ones, and connect with volunteers. We strive to bridge the gap between growers and consumers by enabling site managers to make their information and available produce visible to the community on a centralized map.
                    </p>

                    {/* Our Vision Section */}
                    <h2 class="vision-title">Our Vision</h2>
                    <p class="vision-description">
                        Our mission is to increase access to locally grown fresh produce, inspire community engagement, support local growers, and facilitate collaboration in the food system. We aim to make it easy to find community gardens, start new ones, and connect with volunteers. We strive to bridge the gap between growers and consumers by enabling site managers to make their information and available produce visible to the community on a centralized map.
                    </p>

                    {/* Our Community in Action - maybe we wanna have this as its own component? */}

                    {/* Contribute Section */}
                    <h2 class="contribute-title">Contribute</h2>
                    <p class="contribute-description">
                        In an increasingly industrialized society, these aren’t just beautiful ideas – the power of community and sustainable food systems is absolutely essential to the future of public and environmental health, and everyone’s quality of life. We hope you’ll share a piece of our vision and contribute to bringing it to life.
                    </p>
                    <ul class="contribute-list">
                        <li>If you know of a site not yet on the map, please let us know here{/*link to google form*/}</li>
                        <li>If you want to start a community garden and would like to connect with others in your area, feel free to make a post here{/*link to Slack in the help-me-start-a-community-garden channel)*/}</li>
                        <li>If you would like to provide feedback on the website, suggest a new feature, or report a problem, please let us know here{/*link to feedback & testing survey)*/}</li>
                    </ul>

                    {/* Looking Forward Section */}
                    <h2 class="looking-forward-title">Looking Forward</h2>
                    <p class="looking-forward-description">
                        Our sites are currently based in Arizona but we plan to expand to other states in the future.
                    </p>
                </section>

                {/* Buttons Section */}
                <div class="buttons-section">
                  <a href="\map-page" class="styled-button">
                      <img src="assets\icons\Home_Page_Icons\location-icon.svg" alt="Location icon" class="button-icon"></img>
                      <span>Explore Your Local Food System</span>
                  </a>

                  <a href="/calendar-page" class="styled-button">
                    <img src="assets\icons\Home_Page_Icons\tools-icon.svg" alt="Tools icon" class="button-icon"></img>
                    <span>Attend Events & Workshops</span>
                  </a>

                  <a href="/educate-page" class="styled-button">
                    <img src="assets\icons\Home_Page_Icons\produce-icon.svg" alt="Education icon" class="button-icon"></img>
                    <span>Learn About Sustainable Gardening</span>
                  </a>
                  <a href="https://join.slack.com/t/food-web/shared_invite/zt-3ehkiaxvb-VciMeoyII1ErkxytcFHoPw"
                    class="slack-button" target="_blank" rel="noopener noreferrer">
                    <img src="assets\icons\Home_Page_Icons\slack-new-logo.svg" alt="Slack icon" class="button-icon"></img>
                    <span>Join Our Slack Community</span>
                  </a>
                </div>
            </div>
        </>
    );
}

export default HomePage;