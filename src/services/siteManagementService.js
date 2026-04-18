import { supabase } from "../supabaseClient";

// get site data associated with the siteID
export async function getSiteData(siteID) {
    
    const {data, error} = await supabase.from("all_sites").select("*").eq("id", siteID).single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

// update site data associated with the siteID
export async function updateSiteData(siteID, name, contact, address, website, description, hours, produceSoldAt) {
    // update the last_updated date to the current date
    const current_date = new Date().toISOString();

    // update site info in the database
    const {error} = await supabase.from("all_sites").update(
        {name: name, address: address, website: website, contact: contact, hours: hours, description: description, last_updated: current_date, produce_sold_at: produceSoldAt}
    ).eq("id", siteID);

    if (error) {
        throw new Error(error.message);
    }
}

// get the site_id associated with the user in the site_managers table
export async function getSiteIDFromUser(userID){
    const { data, error } = await supabase.from("site_managers").select("site_id").eq("user_id", userID).single();

    if (error) {
        throw new Error(error.message);
    }

    return data.site_id;
}

// get the produce for the site
export async function getCurrentProduce(siteID) {
    const {data, error} = await supabase.from("all_sites").select("produce").eq("id", siteID).single();

    if (error) {
        throw new Error(error.message);
    }

    return data.produce;
}

// update the produce for the site
export async function updateProduceData(siteID, produce) {
    // update the last_updated date to the current date
    const current_date = new Date().toISOString();

    // update the produce in the databse
    const {error} = await supabase.from("all_sites").update({produce: produce, last_updated: current_date}).eq("id", siteID);

    if (error) {
        throw new Error(error.message);
    }
}