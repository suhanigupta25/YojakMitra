import { useState } from "react";
import "./SearchEligibilty.css";
import { useNavigate } from "react-router-dom";

interface Schemes {
  _id: string;
  name: string;
  age: string;
  description: string;
  category: string;
  eligibility: string;
  documentsRequired: string;
  incomeLimit: string;
  gender: string;
  state: string;
}

const SearchEligibility = () => {
  const [schemes, setSchemes] = useState<Schemes[]>([]);
  const [selectedScheme, setSelectedScheme] = useState<Schemes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const [formData, setFormData] = useState({
    age: "",
    state: "",
    occupation: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate=useNavigate();

  const searchEligibility = async () => {
    setLoading(true);
    setError("");
    setSelectedScheme(null); 
    try {
      const result = await fetch(`http://localhost:5000/schemes/checkeligibilty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: formData.age ? Number(formData.age) : "",
          state: formData.state || "",
          occupation: formData.occupation || "",
          gender: formData.gender || "",
        }),
      });

      if (!result.ok) {
        throw new Error("Failed to fetch schemes");
      }

      const schemeData = await result.json();
      setSchemes(schemeData);
      setSearched(true);
    } catch (err) {
      setError("Something went wrong while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchEligibility();
  };

  // Render Detail Page View
  if (selectedScheme) {
    return (
      <div className="scheme-detail-page">
        <div className="detail-header-nav">
          <button className="btn-back" onClick={() => setSelectedScheme(null)}>
            ← Back to Results
          </button>
        </div>

        <div className="detail-content-wrapper">
          <span className="detail-category">{selectedScheme.category || "General Scheme"}</span>
          <h1 className="detail-title">{selectedScheme.name}</h1>
          <p className="detail-long-description">{selectedScheme.description}</p>

          <div className="detail-info-grid">
            <div className="detail-card">
              <h4>Eligibility Criteria</h4>
              <p>{selectedScheme.eligibility || "No specific eligibility requirements listed."}</p>
            </div>

            <div className="detail-card">
              <h4>Documents Required</h4>
              <p>{selectedScheme.documentsRequired || "Standard verification documents apply."}</p>
            </div>

            <div className="detail-card">
              <h4>Demographic Specifications</h4>
              <div className="specs-list">
                <div className="spec-item">
                  <strong>State Jurisdiction:</strong> {selectedScheme.state || "All India"}
                </div>
                <div className="spec-item">
                  <strong>Age Requirements:</strong> {selectedScheme.age || "Open eligibility"}
                </div>
                <div className="spec-item">
                  <strong>Income Constraint:</strong> {selectedScheme.incomeLimit || "No limit specified"}
                </div>
                <div className="spec-item">
                  <strong>Gender Criteria:</strong> {selectedScheme.gender || "All Genders"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Portal / Search Results Grid View
  return (
    <div className="portal-container">
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
                name="age"
                type="number"
                min={0}
                max={100}
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">All States / All India</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
              <select
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              >
                <option value="">Any Occupation</option>
                <option value="Farmer">Farmer</option>
                <option value="Student">Student</option>
                <option value="Entrepreneur">Entrepreneur / Business Owner</option>
                <option value="Street Vendor">Street Vendor</option>
                <option value="Unorganized Sector Worker">Unorganized Sector Worker</option>
                <option value="Senior Citizen">Senior Citizen</option>
                <option value="Landowner">Landowner</option>
                <option value="Minor">Minor / Dependent</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Any Gender / All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Find Schemes"}
            </button>
          </form>
        </div>
      </section>

      <section className="results">
        {error && <p className="error-text">{error}</p>}

        {loading && <p className="loading-text">Loading matched schemes...</p>}

        {!error && !loading && searched && schemes.length === 0 && (
          <p className="no-results">No schemes found matching your profile. Try adjusting the filters.</p>
        )}

        {!error && !loading && schemes.length > 0 && (
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
        )}
      </section>
    </div>
  );
};

export default SearchEligibility;