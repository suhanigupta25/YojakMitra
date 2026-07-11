import { useState } from "react";
import "./SearchEligibilty.css";

interface Schemes{
    _id :string;          
    name : string;
    description:string;
    category: string;
    eligibility :string;
    documentsRequired:string;
    state:string;
}

const SearchEligibility = () => {
 
  const [schemes, setSchemes] = useState<Schemes[]>([]);
  const [FormData, setFormData] = useState({
    age: "",
    state: "",
    occupation: "",
    income: "",
});

  const searchEligibility = async () => {
    const result =await fetch(`http://localhost:5000/schemes/checkeligibilty`,{
      method : "POST",
              headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
    });

    const schemeData = await result.json();
    setSchemes(schemeData);
    
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await searchEligibility();
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
                value={FormData.age}
                onChange={(e)=>setFormData({
                  ...FormData,
                  age: e.target.value
                })}
                placeholder="Enter age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <select id="state"
              value={FormData.state}
              onChange={
                (e)=>setFormData({
                  ...FormData,
                  state :e.target.value
                })
              }>
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