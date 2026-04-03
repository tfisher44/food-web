import "./HomeHeroSection.css"

function HomeHeroSection() {
  return (
    <section className="home-hero-section">
      <iframe
        className="hero-video"
        src="https://player.vimeo.com/video/1180001288?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1&player_id=0&app_id=58479"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        title="hero-video"
      />

      <div className="home-hero-content">
        <h1 className="home-hero-title">Food Web</h1>
      </div>
    </section>
  );
}

export default HomeHeroSection;