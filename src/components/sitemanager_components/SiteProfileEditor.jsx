import "./SiteProfileEditor.css"
import { useState, useEffect } from "react"
import { getSiteData, updateSiteData } from "../../services/siteManagementService"

export default function SiteProfileEditor({onClose, siteID}) {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");
    const [hours, setHours] = useState("");

    useEffect(() => {
        async function setCurrentSiteProfileInfo() {
            try {
                const site = await getSiteData(siteID);
                setName(site?.name || "");
                setContact(site?.contact || "");
                setAddress(site?.address || "");
                setWebsite(site?.website || "");
                setDescription(site?.description || "");
                setHours(site?.hours || "");
            } catch(error) {
                console.log(error);
            }
        }
        setCurrentSiteProfileInfo();
    }, [siteID])

    async function updateSiteProfile(e) {
        e.preventDefault();

        try {
            await updateSiteData(siteID, name, contact, address, website, description, hours);
            alert("Site profile updated successfully!");
        } catch (error) {
            console.log("error updating site data: " + error.message);
            alert("Site info NOT updated: " + error);
        }
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>x</span>
                <h2>Edit Site Profile</h2>

                <form onSubmit={updateSiteProfile}>
                    <label htmlFor="nameInput">Site Name</label>
                    <input id="nameInput" value={name} onChange={(e) => setName(e.target.value)}></input>

                    <label htmlFor="contactInput">Contact</label>
                    <input id="contactInput" value={contact} onChange={(e) => setContact(e.target.value)}></input>

                    <label htmlFor="addressInput">Address</label>
                    <input id="addressInput" value={address} onChange={(e) => setAddress(e.target.value)}></input>

                    <label htmlFor="websiteInput">Website</label>
                    <input id="websiteInput" value={website} onChange={(e) => setWebsite(e.target.value)}></input>

                    <label htmlFor="hoursInput">Hours</label>
                    <input id="hoursInput" value={hours} onChange={(e) => setHours(e.target.value)}></input>

                    <label htmlFor="descriptionInput">Description</label>
                    <textarea id="descriptionInput" value={description} onChange={(e) => setDescription(e.target.value)} rows="12" cols="40" maxLength="500"></textarea>

                    <button id="update-btn" type="submit">Update Profile</button>
                </form>
            </div>
       </div> 
    )
}