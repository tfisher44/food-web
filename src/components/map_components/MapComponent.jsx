// import arcgis modules
// import esriConfig from "@arcgis/core/config";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/core/assets/esri/themes/light/main.css";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-home";
import "@arcgis/map-components/components/arcgis-fullscreen";

function MapComponent(){

    // uncomment this when ready to deploy (make sure to update the .env with the key and set a new expiration date in Location Platform)
    // esriConfig.apiKey = import.meta.env.VITE_ESRI_API_KEY;

    // functions here

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <arcgis-map
                basemap="streets-navigation-vector"
                zoom="8"
                center={[-111.999999, 33.187204]}
                style={{ height: "100%", width: "100%" }}
            >
                <arcgis-fullscreen position="top-right" />
                <arcgis-zoom position="top-right" />
                <arcgis-search position="top-left" />
                <arcgis-home position="top-right" />
                <arcgis-layer-list position="top-left" />
            </arcgis-map>
        </div>
    );
}

export default MapComponent;