// import components
import HeroSection from "../components/HeroSection"
import './HomePage.css';
import PictureGallery from "../components/home_components/PictureGallery";

function HomePage(){
    return (
        <>
            <HeroSection 
               title="Food Web"
               image="/assets/pictures/HomePageImage.webp"
            />

            {/* What's Food Web and Buttons Area */}
            <div class="food-web-and-buttons">

                <section class="whats-foodweb-section">
                    {/* What is Food Web Section */}
                    <h2 class ="whats-foodweb-title">What is Food Web?</h2>
                    <p class="whats-foodweb-description">
                        Food Web is a platform to connect communities with their local food systems through a network of growers, distributors, volunteers, and community members.
                    </p>
                </section>

                {/* Buttons Section */}
                <div class="buttons-section">
                  <a href="\map-page" class="styled-button" style={{ textDecoration: 'none' }}>
                      <img src="assets\icons\Home_Page_Icons\location-icon.svg" alt="Location icon" class="button-icon"></img>
                      <span>Explore Your Local Food System</span>
                  </a>

                  <a href="/calendar-page" class="styled-button" style={{ textDecoration: 'none' }}>
                    <img src="assets\icons\Home_Page_Icons\tools-icon.svg" alt="Tools icon" class="button-icon"></img>
                    <span>Attend Events & Workshops</span>
                  </a>

                  <a href="/educate-page" class="styled-button" style={{ textDecoration: 'none' }}>
                    <img src="assets\icons\Home_Page_Icons\produce-icon.svg" alt="Education icon" class="button-icon"></img>
                    <span>Learn About Sustainable Gardening</span>
                  </a>
                  <a href="https://join.slack.com/t/food-web/shared_invite/zt-3ehkiaxvb-VciMeoyII1ErkxytcFHoPw"
                    class="slack-button" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <img src="assets\icons\Home_Page_Icons\slack-new-logo.svg" alt="Slack icon" class="button-icon"></img>
                    <span>Join Our Slack Community</span>
                  </a>
                </div>
            </div>

            {/* Main Content */}
            {/* <section class="main-content-section"> */}
                <div class="mission-vision">
                    {/* Mission Section */}
                    <div class="mission-section">
                        <h2 class="mission-title">Our Mission</h2>
                        <p class="mission-description">
                            Our mission is to increase access to locally grown fresh produce, inspire community engagement, support local growers, and facilitate visibility and collaboration in the food system. We aim to make it easy to find community gardens, start new ones, and connect with volunteers. We strive to bridge the gap between growers and consumers by enabling site managers to make their information and produce visible to the community on a centralized map.
                        </p>
                    </div>

                    {/* Our Vision Section */}
                    <div class="vision-section">
                        <h2 class="vision-title">Our Vision</h2>
                        <p class="vision-description">
                            We envision a world where you can walk a few minutes from your home and gather a basket of fresh fruit and vegetables from your neighborhood garden, instead of a bag of chips from the corner store. Urban areas across the United States are filled with green growing spaces and local farms that have been integrated into urban planning or transformed from vacant lots, helping to create a network of diverse sources of fresh food. Excess produce makes it to food banks and nearby residents before going to waste, helping to combat food insecurity. There are plenty of opportunities to get involved and the food system is resilient because everyone has a unique and vital hand in it.
                        </p>
                    </div>
                </div>

                {/* Our Community in Action - maybe we wanna have this as its own component? */}
                 {/* style={{ position: "relative", width: "100%", height: "61vh" }} */}
                <div className="gallery-container">
                    <PictureGallery />
                </div>

                <div class="contribute-forward">
                    {/* Contribute Section */}
                    <h2 class="contribute-title">Contribute</h2>
                    <p class="contribute-description">
                        The power of community and sustainable food systems is absolutely essential to the future of public and environmental health and everyone's quality of life. We hope you’ll share a piece of our vision and contribute to bringing it to life.
                    </p>
                    <ul class="contribute-list">
                        <li>If you know of a site not yet on the map, please let us know <a href="https://docs.google.com/forms/d/e/1FAIpQLSfAeA8WzHOEPZ-Wi04f8yTwhQoeJuPxn7m9euEdPLvV0L_rrg/viewform"
                            class="text-link" target="_blank" rel="noopener noreferrer">
                                <span>here</span></a>.</li>
                        <li>If you want to start a community garden and would like to connect with others in your area, feel free to make a post <a href="https://join.slack.com/t/food-web/shared_invite/zt-3ehkiaxvb-VciMeoyII1ErkxytcFHoPw"
                            class="text-link" target="_blank" rel="noopener noreferrer">
                                <span>here</span></a>.</li>
                        <li>If you would like to provide feedback on the website, suggest a new feature, or report a problem, please let us know <a href="https://docs.google.com/forms/d/e/1FAIpQLSf7gb-jV47PuYQ22X_TPo9Fmgt3pm-7FSfnenzhsbykLPdEmQ/viewform"
                            class="text-link" target="_blank" rel="noopener noreferrer">
                                <span>here</span></a>.</li>
                    </ul>

                    {/* Looking Forward Section */}
                    <h2 class="looking-forward-title">Looking Forward</h2>
                    <p class="looking-forward-description">
                        Our sites are currently based in Arizona but we plan to expand to other states in the future.
                    </p>
                </div>
            {/* </section> */}

            <footer class="footer-section">
                <img src="assets\icons\Home_Page_Icons\logo.svg" alt="Food Web Logo" class="logo"></img>
                <div class="social-links">
                    <a href="https://www.instagram.com/foodweb.community" class="insta-link" 
                    target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <img src="assets\icons\Home_Page_Icons\instagram-icon.svg" alt="Instagram"></img>
                    <span>foodweb.community</span>
                    </a>
                </div>
            </footer>
        </>
    );
}

export default HomePage;