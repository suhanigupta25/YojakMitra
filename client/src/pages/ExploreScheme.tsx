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

      {/* Search Input Form */}
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
      {loading && <div className="loading-indicator" style={{ marginTop: "1.5rem", textAlign: "center", color: "#7a6e67" }}>Fetching matches...</div>}
      {error && <div className="error-indicator" style={{ color: "#d9534f", marginTop: "1.5rem", textAlign: "center" }}>{error}</div>}
      
      {!loading && hasSearched && schemes.length === 0 && (
        <div className="no-results" style={{ marginTop: "1.5rem", textAlign: "center", color: "#7a6e67" }}>
          No schemes matched your criteria. Try another keyword.
        </div>
      )}

      {/* 
        RESULTS SECTION: Moved inside the layout frame 
        so it perfectly aligns with the 850px reading flow constraint
      */}
      {schemes.length > 0 && (
        <section className="results-section" style={{ marginTop: "4rem" }}>
          <h2 className="section-title" style={{ fontFamily: "Georgia, serif", color: "#3d342f", fontWeight: 400, marginBottom: "1.5rem" }}>
            Available Schemes
          </h2>
          <div className="results-grid">
            {schemes.map((scheme) => (
              <div
                key={scheme._id}
                className="preview-card"
                onClick={() => navigate(`/schemes/${scheme._id}`)}
              >
                <h3>{scheme.name}</h3>
                <p className="preview-description">{scheme.description}</p>
                <span className="view-more-link">View Details →</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* The empty visual space helper only renders when there are no active results display grids */}
      {schemes.length === 0 && <div className="explore-empty-canvas"></div>}
    </div>
  </div>
  );
};

export default ExploreSchemes;