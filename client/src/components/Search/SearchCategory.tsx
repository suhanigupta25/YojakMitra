import SchemeDetails from "../SchemeDetails/SchemeDetails";
import "./SearchCategory.css";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";


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

const SearchCategory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [schemes, setSchemes] = useState<Schemes[]>([]);
  const navigate=useNavigate();

  const browseCategory = async (category: string) => {
    const res = await fetch(`http://localhost:5000/schemes?category=${encodeURIComponent(category)}`);
    const data = await res.json();
    setSchemes(data);
  };

  const browseAnything = async (search: string) => {
    const result = await fetch(`http://localhost:5000/schemes/search?search=${search}`);
    const data = await result.json();
    setSchemes(data);
  };

  useEffect(() => {
    browseAnything(searchQuery);
  }, [searchQuery]);

  return (
    <div className="search-category-page">
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

      <section className="browse-section">
        <h2>Browse by Category</h2>
        <div className="category-grid">
          <div className="category-card" onClick={() => browseCategory("Agriculture, Rural & Environment")}>Agriculture, Rural & Environment</div>
          <div className="category-card" onClick={() => browseCategory("Banking, Financial Services & Insurance")}>Banking, Financial Services & Insurance</div>
          <div className="category-card" onClick={() => browseCategory("Business & Entrepreneurship")}>Business & Entrepreneurship</div>
          <div className="category-card" onClick={() => browseCategory("Education & Learning")}>Education & Learning</div>
          <div className="category-card" onClick={() => browseCategory("Health & Wellness")}>Health & Wellness</div>
          <div className="category-card" onClick={() => browseCategory("Housing & Shelter")}>Housing & Shelter</div>
          <div className="category-card" onClick={() => browseCategory("Skills & Employment")}>Skills & Employment</div>
          <div className="category-card" onClick={() => browseCategory("Social welfare & Empowerment")}>Social welfare & Empowerment</div>
          <div className="category-card" onClick={() => browseCategory("Transport & Infrastructure")}>Transport & Infrastructure</div>
          <div className="category-card" onClick={() => browseCategory("Utility & Sanitation")}>Utility & Sanitation</div>
        </div>
      </section>

      <section className="results-section">
        {schemes.length > 0 && <h2 className="section-title">Available Schemes</h2>}
        <div className="results-grid">
          {schemes.map((scheme) => (
            <div 
              key={scheme._id} 
              className="preview-card"
              onClick={() => {
                navigate(`/schemes/${scheme._id}`)}}
            >
              <h3>{scheme.name}</h3>
              <p className="preview-description">{scheme.description}</p>
              <span className="view-more-link">View Details →</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchCategory;