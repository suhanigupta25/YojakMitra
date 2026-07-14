import React, { useState } from "react";
import "./AiAssistant.css";

const AiAssistant = () => {
    const [query, setQuery] = useState("");

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        
        console.log("Submitting query to AI:", query);
        // Prompt initialization goes here
    };

    return (
        <div className="ai-minimal-section">
            <div className="ai-minimal-wrapper">
                
                {/* Minimal Header Masthead */}
                <div className="ai-minimal-header">
                    <h2>Consult YojnaMitra AI</h2>
                    <p>
                        Describe your personal profile, regional context, or structural requirements naturally to begin an assisted evaluation.
                    </p>
                </div>

                {/* Integrated Input Base Interface */}
                <form className="ai-minimal-input-form" onSubmit={handleChatSubmit}>
                    <div className="ai-input-container">
                        <input
                            type="text"
                            placeholder="Type a message, e.g., \Is PM kisan yojana useful for "
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        <button type="submit" className="btn-ai-submit">
                            Initialize
                        </button>
                    </div>
                </form>

                {/* Intentional Balanced Empty Frame */}
                <div className="ai-minimal-void"></div>

            </div>
        </div>
    );
};

export default AiAssistant;