import { useState } from "react";
import "./SearchEligibilty.css";

const SearchEligibility = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle eligibility form submission logic here
  };

    const browseCategory = async (category: string) => {
        const res = await fetch(`http://localhost:5000/schemes?category=${category}`);
        const data = await res.json();

        setSchemes(data);
    };

  return (
    <div className="portal-container">
      {/* Hero Header & Form Split Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="tagline">Official Directory</span>
          <h1>Find Government Schemes</h1>
          <p>
            Discover state and central initiatives curated to your background profile in just a few clicks.
          </p>
        </div>

        <div className="eligibility-card">
          <h2>Check Eligibility</h2>
          <form className="eligibility-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                placeholder="Enter age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <select id="state">
                <option value="">Select State</option>
                <option value="delhi">Delhi</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="karnataka">Karnataka</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
              <select id="occupation">
                <option value="">Select Occupation</option>
                <option value="student">Student</option>
                <option value="farmer">Farmer</option>
                <option value="entrepreneur">Entrepreneur</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="income">Annual Income</label>
              <input
                id="income"
                type="number"
                placeholder="Annual Income"
              />
            </div>

            <button type="submit">
              Find Schemes
            </button>
          </form>
        </div>
      </section>

      {/* Inline Search Infrastructure */}
      <section className="search-section">
        <h2>Search For Scheme</h2>
        <div className="search-container">
          <span className="search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search for specific schemes directly (e.g., PM-Kisan, Startup India)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="scheme-search-bar"
          />
        </div>
      </section>

      {/* Directory Categories Grid */}
      <section className="browse-section">
        <h2>Browse by Category</h2>
        <div className="category-grid">
          <div className="category-card" onClick={()=>browseCategory("Healthcare")}>Healthcare</div>
          <div className="category-card" onClick={()=>browseCategory("Agriculture")}>Agriculture</div>
          <div className="category-card" onClick={()=>browseCategory("Housing")}>Housing</div>
          <div className="category-card" onClick={()=>browseCategory("Employment")}>Employment</div>
          <div className="category-card" onClick={()=>browseCategory("Startup")}>Startup</div>
          <div className="category-card" onClick={()=>browseCategory("Education")}>Education</div>
          <div className="category-card" onClick={()=>browseCategory("Senior Citizen")}>Senior Citizen</div>
          <div className="category-card" onClick={()=>browseCategory("Finance")}>Finance</div>
        </div>
      </section>

          <section>

              {schemes.map((scheme) => (
                  <div key={scheme._id}>
                      {scheme.name}
                  </div>
              ))}

          </section>
    </div>
  );
};

export default SearchEligibility;