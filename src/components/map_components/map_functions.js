import Graphic from "@arcgis/core/Graphic.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import { supabase } from "../../supabaseClient";

// Functions to populate the map:

// create graphic
function createGraphic(site){
    const point = {
        type: "point",
        longitude: site.longitude,
        latitude: site.latitude
    }

    const siteAttributes = {
        ObjectID: site.id,
        Name: site.name,
        Address: site.address,
        Website: site.website,
        Hours: site.hours,
        Contact: site.contact,
        Description: site.description,
        Produce: site.produce    
    }

    return new Graphic({
        geometry: point,
        attributes: siteAttributes
    })
}

// populate layer
async function populateLayer(siteType, icon, layerName) {
    try {
        // fetch the data from Supabase
        const { data, error } = await supabase.from("all_sites").select('*').eq("site_type", siteType);

        if (error) {
            console.error('Error loading data from Supabase', error)
            return;
        }

        // create an array of graphics using the array of site data from Supabase
        const graphics = data.map((site) => createGraphic(site));

        // create the feature layer
        return new FeatureLayer({
            title: layerName,
            objectIdField: "ObjectID",
            fields: [
                {name: "ObjectID", type: "oid"},
                {name: "name", type: "string"},
                {name: "address", type: "string"},
                {name: "website", type: "string"},
                {name: "hours", type: "string"},
                {name: "contact", type: "string"},
                {name: "description", type: "string"},
                {name: "produce", type: "string"}
            ],
            source: graphics,
            renderer: {
                type: "simple",
                symbol: {
                    type: "picture-marker",
                    url: icon,
                    width: "28px",
                    height: "28px"
                }
            },
            popupTemplate: {
                title: "{Name}",
                content: `
                    <b>Address:</b> {address}<br><br>
                    <a href={website} target=_blank><b>Visit Website</b></a><br><br>
                    <b>Contact:</b> {contact}<br><br>
                    <b>Hours:<br></b>{hours}<br><br>
                    <b>Description:</b> {description}<br><br>
                    <b>Available Produce:</b><br> {produce}
                    `
            }
        })
        
    } catch (e) {
        console.error("Error populating layer", e);
    }
}

// define the table name and marker icon for each layer
const SITE_LAYERS = {
    GARDENS: {
        layerName: "Community Gardens",
        siteType: "community_garden",
        icon: "/assets/icons/Map_Page_Icons/lettuce.png"
    },
    FARMS: {
        layerName: "Local Farms",
        siteType: "farm",
        icon: "/assets/icons/Map_Page_Icons/carrot.png"
    },
    FARMERS_MARKETS: {
        layerName: "Farmers Markets",
        siteType: "farmers_market",
        icon: "/assets/icons/Map_Page_Icons/strawberry.png"
    },
    FOOD_BANKS: {
        layerName: "Food Banks",
        siteType: "food_bank",
        icon: "/assets/icons/Map_Page_Icons/grapes.png"
    },
    COMPOST_SITES: {
        layerName: "Compost Collection Sites",
        siteType: "compost",
        icon: "/assets/icons/Map_Page_Icons/shovel.png"
    }
};

// populate all layers
export async function populateAllLayers() {
    try {
        const [gardens, farms, farmersMarkets, foodBanks, compostSites] = await Promise.all([
            populateLayer(SITE_LAYERS.GARDENS.siteType, SITE_LAYERS.GARDENS.icon, SITE_LAYERS.GARDENS.layerName),
            populateLayer(SITE_LAYERS.FARMS.siteType, SITE_LAYERS.FARMS.icon, SITE_LAYERS.FARMS.layerName),
            populateLayer(SITE_LAYERS.FARMERS_MARKETS.siteType, SITE_LAYERS.FARMERS_MARKETS.icon, SITE_LAYERS.FARMERS_MARKETS.layerName),
            populateLayer(SITE_LAYERS.FOOD_BANKS.siteType, SITE_LAYERS.FOOD_BANKS.icon, SITE_LAYERS.FOOD_BANKS.layerName),
            populateLayer(SITE_LAYERS.COMPOST_SITES.siteType, SITE_LAYERS.COMPOST_SITES.icon, SITE_LAYERS.COMPOST_SITES.layerName),
        ]);

        const layers = {
            gardensLayer: gardens,
            farmsLayer: farms,
            farmersMarketsLayer: farmersMarkets,
            foodBanksLayer: foodBanks,
            compostLayer: compostSites
        };

        return layers;

    } catch (e) {
        console.error("Error in populateAllLayers", e);
    }

    return null;
}

// add layers to the map view
export function addLayersToMap(mapView, layers) {
    mapView.map.add(layers.compostLayer);
    mapView.map.add(layers.foodBanksLayer);
    mapView.map.add(layers.farmersMarketsLayer);
    mapView.map.add(layers.farmsLayer);
    mapView.map.add(layers.gardensLayer);
}

// function to filter the gardensLayer and farmsLayer by produce
export function searchByProduce(searchTerm, layers) {
    const produce = searchTerm.toLowerCase();

    if (produce.trim() !== "") {
        
        layers.gardensLayer.definitionExpression = `produce LIKE '%${produce}%'`;
        layers.farmsLayer.definitionExpression = `produce LIKE '%${produce}%'`;

        // hide the other layers
        layers.farmersMarketsLayer.visible = false;
        layers.foodBanksLayer.visible = false;
        layers.compostLayer.visible = false;

    } else {
        alert("Produce search input is empty.");
    }
}

export async function clearProduceResults(layers) {
    // reset layer visibility
    layers.gardensLayer.definitionExpression = null;
    layers.farmsLayer.definitionExpression = null;
    layers.farmersMarketsLayer.visible = true;
    layers.foodBanksLayer.visible = true;
    layers.compostLayer.visible = true;
}