// import arcgis modules:
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-locate";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-home";
import "@arcgis/map-components/components/arcgis-fullscreen";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/core/assets/esri/themes/light/main.css";
import esriConfig from "@arcgis/core/config";
// imports from react:
import { useEffect, useState } from "react";
//import custom components and helper functions:
import { populateAllLayers, addLayersToMap, searchByProduce, clearProduceResults } from "./map_functions";
import MapSearchBar from "./MapSearchBar";

function MapComponent(){
    // ArcGIS API Key: update the .env with a new key before expiration
    // restrict the API key to foodweb.community once deployed
    const arcgisAPI = esriConfig.apiKey = import.meta.env.VITE_ESRI_API_KEY;

    const [mapView, setMapView] = useState(null);
    const [layers, setLayers] = useState(null);

    // store the map view once available
    const handleViewReady = (event) => {
        const mapView = event.target;
        setMapView(mapView)
    }

    // populate the layers, add them to the map, and store them in state when mapView is ready
    useEffect(() => {
        async function loadMap() {
            const layers = await populateAllLayers();
            setLayers(layers);

            if (mapView && layers) {
                addLayersToMap(mapView, layers);
            }
        }
        loadMap();
    }, [mapView]);

    // define the sources and search criteria for the arcgis-search component
    async function configureArcGISSearch() {
        const search = document.querySelector("arcgis-search");
        await search.componentOnReady();
        search.sources = [
            {layer: layers.gardensLayer, searchFields: ["Name"], displayField: "Name", exactMatch: false, outFields: ["*"], name: "Community Gardens"},
            {layer: layers.farmsLayer, searchFields: ["Name"], displayField: "Name", exactMatch: false, outFields: ["*"], name: "Local Farms"},
            {layer: layers.farmersMarketsLayer, searchFields: ["Name"], displayField: "Name", exactMatch: false, outFields: ["*"], name: "Farmers Markets"},
            {layer: layers.foodBanksLayer, searchFields: ["Name"], displayField: "Name", exactMatch: false, outFields: ["*"], name: "Food Banks"},
            {layer: layers.compostLayer, searchFields: ["Name"], displayField: "Name", exactMatch: false, outFields: ["*"], name: "Compost Collection Sites"},
            {
                name: "ArcGIS World Geocoding Service",
                apiKey: arcgisAPI, // ensure that geocoding is enabled in api key
                singleLineFieldName: "SingleLine",
                url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer",
            }
        ];
    }

    // add legend to the arcgis-layer-list component
    async function addLegendToLayerList() {
        document.querySelector("arcgis-layer-list").listItemCreatedFunction = (event) => {
            const { item } = event;
            if (item.layer.type != "group") {
                item.panel = {
                    content: "legend",
                    open: false,
                };
            }
        };
    }

    // call arcgis component functions when layers are ready
    useEffect(() => {
        if (layers) {
            configureArcGISSearch();
            addLegendToLayerList();
        }
    }, [layers]);

    return (
        <div style={{ height: "61vh", width: "100%" }}>
            <arcgis-map
                basemap="streets-navigation-vector"
                zoom="8"
                center={[-112.000000, 33.380000]}
                style={{ height: "61vh", width: "100%" }}
                onarcgisViewReadyChange={handleViewReady}
            >
                <arcgis-search
                    position="top-left"
                    all-placeholder="Search for place"
                    include-default-sources-disabled>
                </arcgis-search>
                <arcgis-fullscreen position="top-right" />
                <arcgis-zoom position="top-right" />
                <arcgis-home position="top-right" />
                <arcgis-layer-list position="bottom-left" />

                <div className="search-bar-produce-wrapper">
                    <MapSearchBar 
                        placeholder="Search for food"
                        searchFunction={(searchTerm => searchByProduce(searchTerm, layers))}
                        submitBtnIcon={"/assets/icons/Map_Page_Icons/apple-search.png"}
                        clearFunction={() => clearProduceResults(layers)}
                    />
                </div>
            </arcgis-map>
        </div>
    );
}

export default MapComponent;
