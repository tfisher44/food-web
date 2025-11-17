import { supabase } from "../../supabaseClient"
import { useState, useEffect } from "react"
import "./ProduceEditor.css"

// in the future if produce feature is widely used, switch to a relational produce table with separate fields for name, cost, qualtity, etc.
// and change produce form to have separate inputs for each field

export default function ProduceEditor({onClose, siteID}){
    const [produce, setProduce] = useState("");

    useEffect(() => {
        async function getCurrentProduce() {
            const {data, error} = await supabase.from("all_sites").select("produce").eq("id", siteID);
            console.log("produce", data);

            if (error) {
                console.log("error getting produce data", error);
            } else {
                setProduce(data?.[0]?.produce || "");
            }
        }
        getCurrentProduce();
    }, [siteID])

    async function updateProduce(e) {
        e.preventDefault();

        const {error} = await supabase.from("all_sites").update({produce}).eq("id", siteID);

        if (error) {
            console.log("error updating produce", error.message);
            alert("Produce NOT updated successfully", error);
        } else {
            alert("Produce updated successfully!");
        }
    }

    return (
       <div className="popup-overlay">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>x</span>
                <h2>Edit Produce</h2>

                <form onSubmit={updateProduce}>
                    <p>
                        <b>We recommend that you enter each item in the following format:</b>
                        <br />Produce Name, Cost (Date range of availability)
                    </p>
                    <p>
                        <b>Example:</b>
                        <br />Watermelons, Free (4/3 - 4/30)<br />Carrots, $3/lb (5/1 - 5/30)
                    </p>
                    <textarea value={produce} onChange={(e) => setProduce(e.target.value)} rows="15" cols="50" maxLength="200"></textarea>

                    <button id="produce-update-btn" type="submit">Update Produce</button>
                </form>
            </div>
       </div> 
    )
}