
import "./CalendarComponent.css"

function CalendarComponent() {
      //Change to include button for google forms
      const handleEventsCurr = () => {
                  Events.style.display = "block";
                  Markets.style.display = "none";
                  showEvents.style.display = "none";
                  showMarkets.style.display = "block";
                  showEventsForm.style.display = "block";
                  showMarketsForm.style.display = "none";
  };

  const handleMarketsCurr = () => {
                Events.style.display = "none";
                Markets.style.display = "block";
                showEvents.style.display = "block";
                showMarkets.style.display = "none";
                showEventsForm.style.display = "none";
                showMarketsForm.style.display = "block";
                };

  const handleClickForms = () => {
      if(Markets.style.display = "block"){
      window.location.href = "https://forms.gle/p5ECzb8c4osVNmqV8";
      }
      else{
          window.location.href = "https://forms.gle/G7yrAzv797prK9Ud6";  
      }
  };

<style>

</style>

  return (
    
    
    <div id = "containerCal">
      <div id="cal-button" style={{display: "flex", justifyContent: "center", gap: "10px",  marginTop: "10px", flexWrap: "wrap"}}>
       <button class = "cal-button" style={{display: "none"}} id="showEvents"onClick={handleEventsCurr}>Show Events Calendar</button>
       <button class = "cal-button" style={{display: "inline-block"}} id="showMarkets"onClick={handleMarketsCurr}>Show Farmer Markets Calendar</button>
       
       <button class = "cal-button" style={{display: "none"}} id="showEventsForm"onClick={handleClickForms}>Add New Events and Workshops To The Calendar</button>
       <button class = "cal-button" style={{ display: "inline-block"}} id="showMarketsForm"onClick={handleClickForms}>Add New Farmer Market To The Calendar</button>    
      </div> 

      <h1></h1>
      
      <div id="Events-Frame">
      <iframe
        id = "Events"
        src="https://calendar.google.com/calendar/embed?src=0895ff4adef3b12e0b6a603821ff3f38e5d32e162f147a52a667347b2d2740d5%40group.calendar.google.com&ctz=America%2FPhoenix"
        style={{ border: 0, width: 800, height: 600, marginLeft: "auto", marginRight: "auto", display: "flex"  }}
        title="Events"
      ></iframe>
      </div>

      <div id="Markets-Frame">
      <iframe
        id = "Markets"
        src="https://calendar.google.com/calendar/embed?src=2d50de4a678c7196d9d94cd25f4b50f48deb6a038618116e65951800b3bf2c74%40group.calendar.google.com&ctz=America%2FPhoenix"
        style={{ border: 0, width: 800, height: 600, marginLeft: "auto", marginRight: "auto", display: "none"}}
        title="Markets"
      ></iframe>
      </div>

      
    </div>    

  );
}

export default CalendarComponent;
