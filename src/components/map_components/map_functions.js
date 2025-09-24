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

// site name search function
export function searchBySiteName(searchTerm, layers, view) {
    const query = searchTerm.toLowerCase();

    const allSites = [
    ...layers.gardensLayer.current.graphics,
    ...layers.farmsLayer.current.graphics,
    ...layers.farmersMarketsLayer.current.graphics,
    ...layers.foodBanksLayer.current.graphics,
    ...layers.compostLayer.current.graphics
]

    const result = allSites.filter(site => {
        const name = site.attributes.Name?.toLowerCase();
        return name.includes(query);
    });

    if (result.length > 0) {
        const match = result[0];
        view.goTo({
            target: match.geometry,
            zoom: 16
        })
    } else {
        alert("No sites found");
        console.log("search results not found");
    }
}

export function clearSiteNameResults(view){
    //recenter the map
    view.goTo({
        center: [-112.000000, 33.080000],
        zoom: 8
    })
}

// produce search / filter function
export function searchByProduce(searchTerm, layers) {
    const query = searchTerm.toLowerCase();

    if (searchTerm.trim() !== "") {
        const gardens = layers.gardensLayer.current.graphics;
        const farms = layers.farmsLayer.current.graphics;

        const matchingGardens = gardens.filter(site => {
            const produce = site.attributes.Produce?.toLowerCase() || '';
            return produce.includes(searchTerm);
        });

        const matchingFarms = farms.filter(site => {
            const produce = site.attributes.Produce?.toLowerCase() || '';
            return produce.includes(searchTerm);
        });

        if (matchingGardens.length > 0 || matchingFarms.length > 0) {
            // Hide other layers
            layers.farmersMarketsLayer.current.visible = false;
            layers.foodBanksLayer.current.visible = false;
            layers.compostLayer.current.visible = false;

            // remove all graphics from gardens and farms layers
            layers.gardensLayer.current.removeAll();
            layers.farmsLayer.current.removeAll();

            // add only the farms and gardens that have matching produce
            layers.gardensLayer.current.addMany(matchingGardens);
            layers.farmsLayer.current.addMany(matchingFarms);
        }
        else {
            alert("No matching produce found.");
        }

    } else {
        alert("Produce search input is empty.");
    }
}

export async function clearProduceResults(layers) {
    // Reset layer visibility
    layers.farmersMarketsLayer.current.visible = true;
    layers.foodBanksLayer.current.visible = true;
    layers.compostLayer.current.visible = true;

    // repopulate the farms and gardens layers:
    await Promise.all([
        populateLayer(SITE_LAYERS.GARDENS.tableName, SITE_LAYERS.GARDENS.icon, layers.gardensLayer.current),
        populateLayer(SITE_LAYERS.FARMS.tableName, SITE_LAYERS.FARMS.icon, layers.farmsLayer.current)
    ]);
}