import Graphic from "@arcgis/core/Graphic.js";
import { supabase } from "../../supabaseClient";

// Functions to populate the map:

function createGraphic(site, icon) {
    return new Graphic({
        geometry: {
            type: "point",
            longitude: site.Longitude,
            latitude: site.Latitude
        },
        symbol: {
            "type": "picture-marker",
            "url": icon,
            "width": "30px",
            "height": "30px"
        },
        attributes: {
            Name: site.Name,
            Address: site.Address,
            Website: site.Website,
            Hours: site.Hours,
            Contact: site.Contact,
            Description: site.Description,
            Produce: site.Produce    
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
    });
}

async function populateLayer(tableName, icon, layer) {
    try {
        // fetch the data from Supabase
        const { data, error } = await supabase.from(tableName).select('*');

        if (error) {
            console.error('Error loading data from Supabase', error)
            return;
        }

        // create a graphic for each of the sites from the table
        data.forEach(site => {
            const graphic = createGraphic(site, icon);
            layer.add(graphic); // add the graphic to the layer
        });

    } catch (e) {
        console.error('Unexpected error in populate_layer', e);
    }
}

// object to define the Supabase table names and icon paths for each layer
export const SITE_LAYERS = {
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

export async function populateAllLayers(layers) {
    try {
        // run the populate_layer functions in parallel
        await Promise.all([
            populateLayer(SITE_LAYERS.GARDENS.tableName, SITE_LAYERS.GARDENS.icon, layers.gardensLayer.current),
            populateLayer(SITE_LAYERS.FARMS.tableName, SITE_LAYERS.FARMS.icon, layers.farmsLayer.current),
            populateLayer(SITE_LAYERS.FARMERS_MARKETS.tableName, SITE_LAYERS.FARMERS_MARKETS.icon, layers.farmersMarketsLayer.current),
            populateLayer(SITE_LAYERS.FOOD_BANKS.tableName, SITE_LAYERS.FOOD_BANKS.icon, layers.foodBanksLayer.current),
            populateLayer(SITE_LAYERS.COMPOST_SITES.tableName, SITE_LAYERS.COMPOST_SITES.icon, layers.compostLayer.current),
        ]);
    } catch (err) {
        console.error('Error populating layers:', err);
    }
}

// add each useRef layer to the map
export function initializeMapLayers(viewElement, layers) {
    viewElement.map.add(layers.foodBanksLayer.current);
    viewElement.map.add(layers.farmersMarketsLayer.current);
    viewElement.map.add(layers.compostLayer.current);
    viewElement.map.add(layers.farmsLayer.current);
    viewElement.map.add(layers.gardensLayer.current);
}

//  ------------------------------------------------
// Search and Filter Functions: 

// TODO: implement functions

// site name search function
export function searchBySiteName(searchTerm, layers) {
    const query = searchTerm.toLowerCase();
}

// produce search / filter function
export function searchByProduce(searchTerm, layers) {
    const query = searchTerm.toLowerCase();
}