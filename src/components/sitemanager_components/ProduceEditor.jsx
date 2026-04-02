import "./ProduceEditor.css"
import { useState, useEffect } from "react"
import { getCurrentProduce, updateProduceData } from "../../services/siteManagementService"

// in the future if produce feature is widely used, switch to a relational produce table with separate fields for name, cost, qualtity, etc.
// and change produce form to have separate inputs for each field

export default function ProduceEditor({onClose, siteID}){
    const [produce, setProduce] = useState("");

    useEffect(() => {
        async function setCurrentProduce() {
            try {
                const currentProduce = await getCurrentProduce(siteID);
                setProduce(currentProduce || "");
            } catch (error){
                console.log("Error getting produce data: ", error);
                alert("Error getting produce data");
            }
        }
        setCurrentProduce();
    }, [siteID])

    async function updateProduce(e) {
        e.preventDefault();

        try {
            await updateProduceData(siteID, produce);
            alert("Produce updated successfully!");
        } catch (error){
            console.log("Error updating produce data: ", error);
            alert("Produce NOT updated successfully");
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