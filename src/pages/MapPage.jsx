// import components
import HeroSection from "../components/HeroSection"
import MapComponent from "../components/map_components/MapComponent";

function MapPage(){

    return (
        <>
            <HeroSection
                title="Explore Your Local Food System"
                image="/assets/pictures/MapPageImage.webp"
            />

            <div className="map-container" style={{ position: "relative", width: "100%", height: "100vh" }}>
                <MapComponent />

                {/* put the produce edit form here when ready */}
            </div>
        </>
    );
}

export default MapPage;