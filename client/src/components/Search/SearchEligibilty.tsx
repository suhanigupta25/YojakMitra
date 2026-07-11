import { useState } from "react";
import "./SearchEligibilty.css";

interface Schemes{
    title : string;
    description:string;
    category: string;
    eligibility :string;
    documentsRequired:string;
    state:string;
}

const SearchEligibility = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [schemes, setSchemes] = useState<Schemes[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
    </div>
  );
};

export default SearchEligibility;