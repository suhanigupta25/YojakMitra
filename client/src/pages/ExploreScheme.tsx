import React, { useState } from "react";
import "./ExploreSchemes.css";

const ExploreSchemes = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Search execution hook can be safely handled here
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="explore-section">
            <div className="explore-content-frame">
                
                {/* Structural Minimalist Header Group */}
                <div className="explore-header">
                    <h1>Explore Government Schemes</h1>
                    <p>Enter keywords, demographics, or occupation parameters to look up current state and central programs.</p>
                </div>

                {/* Centered Integrated Search Anchor */}
                <form className="explore-search-form" onSubmit={handleSearchSubmit}>
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            className="explore-search-input"
                            placeholder="Search by keyword, department, or eligibility criteria..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                        <button type="submit" className="btn-explore-search">
                            Search
                        </button>
                    </div>
                </form>

                {/* Intentional Minimal Void Space Canvas */}
                <div className="explore-empty-canvas">
                    {/* Remaining space intentionally left completely vacant */}
                </div>
                
            </div>
        </div>
    );
};

export default ExploreSchemes;