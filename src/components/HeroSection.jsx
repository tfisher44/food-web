import "./HeroSection.css"

function HeroSection({ title, image }) {
    return (
        <section className="hero-section" style={{ backgroundImage: `url(${image})`}}>
            <div className="hero-overlay">
                <h1 className="hero-title">{title}</h1>
            </div>
        </section>
    );
}

export default HeroSection;