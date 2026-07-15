import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Search/SearchCategory.css"; 

interface Scheme {
  _id: string;
  name: string;
  description: string;
  category: string;
  eligibility: string;
  documentsRequired: string;
  incomeLimit: string;
  age: string;
  gender: string;
  state :string;
}

const SchemeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [relatedSchemes, setRelatedSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemeData = async () => {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:5000/schemes/${id}`);
        const currentScheme = await res.json();
        setScheme(currentScheme);

        if (currentScheme.category) {
          const relatedRes = await fetch(`http://localhost:5000/schemes?category=${encodeURIComponent(currentScheme.category)}`);
          const allRelated = await relatedRes.json();
          const filtered = allRelated.filter((s: Scheme) => s._id !== currentScheme._id);
          setRelatedSchemes(filtered);
        }
      } catch (error) {
        console.error("Error loading scheme details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemeData();
  }, [id]);

    if (loading) return <div className="loading-state">Loading editorial profile...</div>;
    if (!scheme) return <div className="error-state">Scheme not found.</div>;



    return (
        <div className="scheme-detail-page">
      <div className="detail-header-nav">
        <button className="btn-back" onClick={() => navigate("/schemes")}>
          ← Back to Explorer
        </button>
      </div>

      <div className="detail-content-wrapper">
        <span className="detail-category">{scheme.category}</span>
        <h1 className="detail-title">{scheme.name}</h1>
        <p className="detail-long-description">{scheme.description}</p>

        <div className="detail-info-grid">
          <div className="detail-card">
            <h4>Who is Eligible?</h4>
            <p>{scheme.eligibility}</p>
          </div>

          <div className="detail-card">
            <h4>Required Documents</h4>
            <p>{scheme.documentsRequired}</p>
          </div>

          <div className="detail-card">
              <h4>Demographics & Demands</h4>
              <div className="specs-list">
                <div className="spec-item"><strong>Age Target:</strong> {scheme.age || "N/A"}</div>
                <div className="spec-item"><strong>Gender:</strong> {scheme.gender || "All"}</div>
                <div className="spec-item"><strong>Income Ceiling:</strong> {scheme.incomeLimit || "No Limit"}</div>
                <div className="spec-item"><strong>State/Region:</strong> {scheme.state || "National"}</div>
              </div>
        </div>
            

        </div>
        

 
      </div>
    </div>
  );
};

export default SchemeDetailPage;