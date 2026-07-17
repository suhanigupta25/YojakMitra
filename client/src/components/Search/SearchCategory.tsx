import "./SearchCategory.css";
import { useState } from "react";
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
  const [schemes, setSchemes] = useState<Schemes[]>([]);
  const navigate=useNavigate();

  const browseCategory = async (category: string) => {
    const res = await fetch(`http://localhost:5000/schemes?category=${encodeURIComponent(category)}`);
    const data = await res.json();
    setSchemes(data);
  };



  return (
    <div className="search-category-page">
     
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

      {schemes.length > 0 &&(
      <section className="results-section">
         <h2 className="section-title">Available Schemes</h2>
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
      )}
      
    </div>
  );
};

export default SearchCategory;