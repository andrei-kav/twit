import React from "react";

import "./search-panel.css";

const SearchPanel = () => {
    return (
        <input type="text"
               className="search-input form-control"
               placeholder="look for posts"
        />
    )
}

export default SearchPanel;