import Graphic from "@arcgis/core/Graphic.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import { supabase } from "../../supabaseClient";

// Functions to populate the map:

// create graphic
function createGraphic(site){
    const point = {
        type: "point",
        longitude: site.Longitude,
        latitude: site.Latitude
    }

    const siteAttributes = {
        ObjectID: site.Site_ID,
        Name: site.Name,
        Address: site.Address,
        Website: site.Website,
        Hours: site.Hours,
        Contact: site.Contact,
        Description: site.Description,
        Produce: site.Produce    
    }

    return new Graphic({
        geometry: point,
        attributes: siteAttributes
    })
}

// populate layer
async function populateLayer(tableName, icon) {
    try {
        // fetch the data from Supabase
        const { data, error } = await supabase.from(tableName).select('*');

        if (error) {
            console.error('Error loading data from Supabase', error)
            return;
        }

        // create an array of graphics using the array of site data from Supabase
        const graphics = data.map((site) => createGraphic(site));

        // create the feature layer
        return new FeatureLayer({
            title: tableName,
            fields: [
                {name: "ObjectID", type: "oid"},
                {name: "Name", type: "string"},
                {name: "Address", type: "string"},
                {name: "Website", type: "string"},
                {name: "Hours", type: "string"},
                {name: "Contact", type: "string"},
                {name: "Description", type: "string"},
                {name: "Produce", type: "string"}
            ],
            source: graphics,
            renderer: {
                type: "simple",
                symbol: {
                    type: "picture-marker",
                    url: icon,
                    width: "30px",
                    height: "30px"
                }
            },
            popupTemplate: {
                title: "{Name}",
                content: `
                    <b>Address:</b> {Address}<br><br>
                    <a href={Website} target=_blank><b>Visit Website</b></a><br><br>
                    <b>Volunteer Hours:</b> {Hours}<br><br>
                    <b>Contact:</b> {Contact}<br><br>
                    <b>Description:</b> {Description}<br><br>
                    <b>Available Produce:</b><br> {Produce}
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
        tableName: "Community Gardens",
        icon: "/assets/icons/lettuce.png"
    },
    FARMS: {
        tableName: "Local Farms",
        icon: "/assets/icons/carrot.png"
    },
    FARMERS_MARKETS: {
        tableName: "Farmers Markets",
        icon: "/assets/icons/strawberry.png"
    },
    FOOD_BANKS: {
        tableName: "Food Banks",
        icon: "/assets/icons/grapes.png"
    },
    COMPOST_SITES: {
        tableName: "Compost Collection Sites",
        icon: "/assets/icons/shovel.png"
    }
};

// populate all layers
export async function populateAllLayers() {
    try {
        const [gardens, farms, farmersMarkets, foodBanks, compostSites] = await Promise.all([
            populateLayer(SITE_LAYERS.GARDENS.tableName, SITE_LAYERS.GARDENS.icon),
            populateLayer(SITE_LAYERS.FARMS.tableName, SITE_LAYERS.FARMS.icon),
            populateLayer(SITE_LAYERS.FARMERS_MARKETS.tableName, SITE_LAYERS.FARMERS_MARKETS.icon),
            populateLayer(SITE_LAYERS.FOOD_BANKS.tableName, SITE_LAYERS.FOOD_BANKS.icon),
            populateLayer(SITE_LAYERS.COMPOST_SITES.tableName, SITE_LAYERS.COMPOST_SITES.icon),
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
        
        layers.gardensLayer.definitionExpression = `LOWER(Produce) LIKE '%${produce}%'`;
        layers.farmsLayer.definitionExpression = `LOWER(Produce) LIKE '%${produce}%'`;

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