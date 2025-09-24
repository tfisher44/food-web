import { useState } from "react";
import "./MapSearchBar.css";

function MapSearchBar({placeholder, onSearch, submitBtnIcon, clearFunction}) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleClear = () => {
        setSearchTerm("");
        clearFunction();
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
            className="map-search-bar" 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            maxLength="30"
            />

            <button className="submit-btn" type="submit">
                <img src={submitBtnIcon} alt="Search" />
            </button>

            <button id="clear-btn" type="button" onClick={handleClear}>
                <img src="/assets/icons/close-line-icon.png" alt="Clear"/>
            </button>
        </form>
    )
}

export default MapSearchBar;