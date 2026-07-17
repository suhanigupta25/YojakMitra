import React, { useState } from "react";
import "./ExploreScheme.css";
import { useNavigate } from "react-router-dom";

interface Schemes {
  _id: string;
  name: string;
  description: string;
  category: string;
  eligibility: string;
  documentsRequired: string;
  state: string;
  gender: string;
  age: string;    
  incomeLimit: string;
}

const ExploreSchemes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [schemes, setSchemes] = useState<Schemes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // Keeps track if a search occurred
  const navigate = useNavigate();

  const browseAnything = async (search: string) => {
    if (!search.trim()) return;

    try {
      setLoading(true);
      setError("");
      setHasSearched(true);
      
      const result = await fetch(`http://localhost:5000/schemes/search?search=${encodeURIComponent(search)}`);
      
      if (!result.ok) {
        throw new Error(`Server responded with status: ${result.status}`);
      }
      
      const data = await result.json();
      
      if (Array.isArray(data)) {
        setSchemes(data);
      } else {
        setSchemes([]);
      }
    } catch (err: any) {
      console.error("Search API Error:", err);
      setError("Failed to fetch schemes. Check your connection or server status.");
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    browseAnything(searchQuery);
  };

  return (
    <div className="explore-section">
      <div className="explore-content-frame">
        <div className="explore-header">
          <h1>Explore Government Schemes</h1>
          <p>Enter keywords, demographics, or occupation parameters to look up current state and central programs.</p>
        </div>

        {/* The form context handles both button clicks and pressing the Enter key automatically */}
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
            <button type="submit" className="btn-explore-search" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {/* Status Indicators */}
        {loading && <div className="loading-indicator" style={{ marginTop: "15px" }}>Fetching matches...</div>}
        {error && <div className="error-indicator" style={{ color: "red", marginTop: "15px" }}>{error}</div>}
        
        {/* Only shows "No results" if the user actually hit search and got nothing back */}
        {!loading && hasSearched && schemes.length === 0 && (
          <div className="no-results" style={{ marginTop: "15px", color: "#666" }}>
            No schemes matched your criteria. Try another keyword.
          </div>
        )}

        <div className="explore-empty-canvas"></div>
      </div>

      {schemes.length > 0 && (
        <section className="results-section">
          <h2 className="section-title">Available Schemes</h2>
          <div className="results-grid">
            {schemes.map((scheme) => (
              <div
                key={scheme._id}
                className="preview-card"
                onClick={() => navigate(`/schemes/${scheme._id}`)}
                style={{ cursor: "pointer" }}
              >
                <h3>{scheme.name}</h3>
                <p className="preview-description">{scheme.description}</p>
                <span className="view-more-link">View Details →</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ExploreSchemes;