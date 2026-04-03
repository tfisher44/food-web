import "./HomeHeroSection.css"

function HomeHeroSection() {
  return (
    <section className="home-hero-section">
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src="../../public/assets/videos/encounter-compressed.mp4" type="video/mp4" />
      </video>

      <div>
        <h1 className="home-hero-title">Food Web</h1>
      </div>
    </section>
  );
}

export default HomeHeroSection; 