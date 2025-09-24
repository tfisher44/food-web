// import arcgis modules
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-home";
import "@arcgis/map-components/components/arcgis-fullscreen";
import "@arcgis/core/assets/esri/themes/light/main.css";
import esriConfig from "@arcgis/core/config";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

// imports from react
import { useEffect, useRef, useState } from "react";

//import custom components and helper functions
import { populateAllLayers, initializeMapLayers, searchBySiteName, searchByProduce, clearSiteNameResults, clearProduceResults } from "./map_functions";
import MapSearchBar from "./MapSearchBar";

function MapComponent(){
    // make sure to update the .env with the most current API key and set a new expiration date in Location Platform
    // esriConfig.apiKey = import.meta.env.VITE_ESRI_API_KEY;

    // useRefs for each of the Graphics layers (stable references to each layer, persists across renders and prevents re-rendering the map component when the layer changes)
    const gardensLayer = useRef(
        new GraphicsLayer({title: "Community Gardens", id: "gardensLayer"})
    );
    const farmsLayer = useRef(
        new GraphicsLayer({title: "Local Farms", id: "farmsLayer"})
    );
    const farmersMarketsLayer = useRef(
        new GraphicsLayer({title: "Farmers Markets", id: "farmersMarketsLayer"})
    );
    const foodBanksLayer = useRef(
        new GraphicsLayer({title: "Food Banks", id: "foodBanksLayer"})
    );
    const compostLayer = useRef(
        new GraphicsLayer({title: "Compost Collection Sites", id: "compostSitesLayer"})
    );

    const [mapView, setMapView] = useState(null); // mapView to pass to the search by name function

    // object with all layer refs
    const allLayers = {
        gardensLayer,
        farmsLayer,
        farmersMarketsLayer,
        foodBanksLayer,
        compostLayer
    }

    // populate the layers (run once after component mounts)
    useEffect(() => {
        populateAllLayers(allLayers);
    }, []); 

    // add the layers to the map
    const handleViewReady = (event) => {
        const viewElement = event.target;
        initializeMapLayers(viewElement, allLayers);
        setMapView(viewElement);
    }

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <arcgis-map
                basemap="streets-navigation-vector"
                zoom="8"
                center={[-112.000000, 33.080000]}
                style={{ height: "100%", width: "100%" }}
                onarcgisViewReadyChange={handleViewReady}
            >
                <arcgis-fullscreen position="top-right" />
                <arcgis-zoom position="top-right" />
                <arcgis-search position="top-left" />
                <arcgis-home position="top-right" />
                <arcgis-layer-list position="top-left" />
            </arcgis-map>
            
            <div className="search-bar-site-name-wrapper">
                <MapSearchBar 
                    placeholder="Search by Site Name"
                    onSearch={(searchTerm => searchBySiteName(searchTerm, allLayers, mapView))}
                    submitBtnIcon={"/assets/icons/search-location-icon.png"}
                    clearFunction={() => clearSiteNameResults(mapView)}
                />
            </div>

            <div className="search-bar-produce-wrapper">
                <MapSearchBar 
                    placeholder="Search for Produce"
                    onSearch={(searchTerm => searchByProduce(searchTerm, allLayers))}
                    submitBtnIcon={"/assets/icons/apple-search.png"}
                    clearFunction={() => clearProduceResults(allLayers)}
                />
            </div>
        </div>
    );
}

export default MapComponent;