import HeroSection from "../components/HeroSection"
import CalendarComponent from "../components/calendar_components/CalendarComponent";
function CalendarPage(){
    return (
        <>
            <HeroSection
                title="Discover Events, Workshops, and Farmers Markets"
                image="/assets/pictures/MapPageImage.webp"
            />
            <CalendarComponent/>
            
        </>
    );
}


export default CalendarPage;