import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SchemeDetails.css";

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
  state: string;
}

interface ComparisonCriterion {
  feature: string;
  values: string[];
}

interface ComparisonResult {
  criteria: ComparisonCriterion[];
  recommendation: string;
}

const SchemeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [relatedSchemes, setRelatedSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [comparing, setComparing] = useState(false);
  const [compareError, setCompareError] = useState("");

  useEffect(() => {
    const fetchSchemeData = async () => {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:5000/schemes/${id}`);
        const currentScheme = await res.json();
        setScheme(currentScheme);

        if (currentScheme.category) {
          const relatedRes = await fetch(
            `http://localhost:5000/schemes?category=${encodeURIComponent(currentScheme.category)}`
          );
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

    setSelectedIds([]);
    setComparison(null);
    setCompareError("");
    fetchSchemeData();
  }, [id]);

  const toggleSelect = (schemeId: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(schemeId)) {
        return prev.filter((s) => s !== schemeId);
      }
      if (prev.length >= 3) return prev; // cap at 3 related + current = 4 total
      return [...prev, schemeId];
    });
  };

  const handleCompare = async () => {
    if (!scheme || selectedIds.length === 0) return;

    setComparing(true);
    setCompareError("");
    setComparison(null);
    const payloadIds = [scheme._id, ...selectedIds];

    try {
      const res = await fetch("http://localhost:5000/schemes/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schemeIds: payloadIds }), 
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate comparison");
      }

      const data: ComparisonResult = await res.json();
      setComparison(data);
    } catch (err: any) {
      setCompareError(err.message || "Something went wrong generating the comparison.");
    } finally {
      setComparing(false);
    }
  };

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

        {relatedSchemes.length > 0 && (
          <div className="related-schemes-section">
            <h3>Other schemes in {scheme.category}</h3>
            <p className="section-hint">
              Pick up to 3 to compare against "{scheme.name}" using AI.
            </p>

            <div className="related-schemes-list">
              {relatedSchemes.map((s) => (
                <label key={s._id} className="related-scheme-item">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(s._id)}
                    onChange={() => toggleSelect(s._id)}
                    disabled={!selectedIds.includes(s._id) && selectedIds.length >= 3}
                  />
                  <span>{s.name}</span>
                </label>
              ))}
            </div>

            <button
              className="btn-compare"
              onClick={handleCompare}
              disabled={selectedIds.length === 0 || comparing}
            >
              {comparing ? "Comparing..." : `Compare Selected with AI (${selectedIds.length})`}
            </button>

            {compareError && <p className="error-text">{compareError}</p>}
            {comparison && (
              <div className="comparison-result">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Criterion</th>
                      <th>{scheme.name}</th>
                      {selectedIds.map((id) => {
                        const selectedScheme = relatedSchemes.find((s) => s._id === id);
                        return (
                          <th key={id}>
                            {selectedScheme ? selectedScheme.name : "Selected Scheme"}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.criteria?.map((item, rowIdx) => (
                      <tr key={item.feature || rowIdx}>
                        <td className="criterion-cell">{item.feature}</td>
                        {(item.values || []).map((val, valIdx) => (
                          <td key={valIdx}>{val || "—"}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {comparison.recommendation && (
                  <div className="comparison-recommendation">
                    <h4>In simple terms</h4>
                    <p>{comparison.recommendation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemeDetailPage;