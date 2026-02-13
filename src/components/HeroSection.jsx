import "./HeroSection.css"

function HeroSection({ title, image, height }) {
    return (
        <section className="hero-section" style={{ backgroundImage: `url(${image})`, height}}>
            <div className="hero-overlay">
                <h1 className="hero-title">{title}</h1>
            </div>
        </section>
    );
}

export default HeroSection;