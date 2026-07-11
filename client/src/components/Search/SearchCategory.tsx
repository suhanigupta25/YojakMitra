import "./SearchEligibilty.css"
import { useEffect, useState } from "react";

interface Schemes{
    _id :string
    name : string;
    description:string;
    category: string;
    eligibility :string;
    documentsRequired:string;
    state:string;
}

const SearchCategory=()=>{
   const [searchQuery, setSearchQuery] = useState("");
    const [schemes, setSchemes] = useState<Schemes[]>([]);

    const browseCategory = async (category: string) => {
        const res = await fetch(`http://localhost:5000/schemes?category=${category}`);
        const data = await res.json();
        setSchemes(data);
    };

    const browseAnything = async( search : string)=>{
      const result= await fetch(`http://localhost:5000/schemes/search=${search}`);
      const data = await result.json();
      setSchemes(data);
    }

    useEffect(() => {
        browseAnything(searchQuery);
    }, [searchQuery]);
  
    return (
    <div>
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
          <div className="category-card" onClick={()=>browseCategory("Healthcare")}>Healthcare</div>
          <div className="category-card" onClick={()=>browseCategory("Agriculture")}>Agriculture</div>
          <div className="category-card" onClick={()=>browseCategory("Housing")}>Housing</div>
          <div className="category-card" onClick={()=>browseCategory("Employment")}>Employment</div>
          <div className="category-card" onClick={()=>browseCategory("Startup")}>Startup</div>
          <div className="category-card" onClick={()=>browseCategory("Education")}>Education</div>
          <div className="category-card" onClick={()=>browseCategory("Senior Citizen")}>Senior Citizen</div>
          <div className="category-card" onClick={()=>browseCategory("Finance")}>Finance</div>
          <div className="category-card" onClick={()=>browseCategory("Sports")}>Sports</div>
          <div className="category-card" onClick={()=>browseCategory("Travel")}>Travel</div>
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
}

export default SearchCategory;