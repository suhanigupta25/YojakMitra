import "./AiAssistant.css"

const AiAssistant = () => {
    return (
        <section className="assistant-page-wrapper">
            {/* LEFT SIDE: Interactive Simulated Chat Box */}
            <div className="assistant-container">
                <div className="chat-header">
                    <div className="header-status-dot"></div>
                    <h1>AI Scheme Assistant</h1>
                    <p>Ask anything about central or state welfare programs</p>
                </div>
                
                <div className="chat-section">
                    <div className="message message-ai">
                        <div className="message-content">
                            Hello! Tell me a bit about yourself (your occupation, age, or state) so I can find matching government schemes for you.
                        </div>
                        <span className="message-time">10:02 AM</span>
                    </div>

                    <div className="message message-user">
                        <div className="message-content">
                            I am a 62-year-old fisherman from Kerala looking for financial assistance.
                        </div>
                        <span className="message-time">10:03 AM</span>
                    </div>
                </div>
                
                <div className="typing-bar">
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Type your profile details or ask about a scheme..." 
                        />
                        <button className="send-btn" aria-label="Send message">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Instructional Guide */}
            <div className="assistant-guide-content">
                <span className="guide-badge">Smart Guidance</span>
                <h2>How to use your AI Assistant</h2>
                <p className="guide-subtitle">
                    Skip the dense legal documents. YojnaMitra uses conversational AI to instantly break down complex criteria, state bylaws, and paperwork updates.
                </p>

                <div className="instruction-steps">
                    <div className="step-card">
                        
                        <div className="step-info">
                            <h3>Ask Clear Doubts Directly</h3>
                            <p>Query specific scheme details like <em>"What documents do I need for PM-Kisan?"</em> or ask for direct translations of complex criteria.</p>
                        </div>
                    </div>

                    <div className="step-card">
                        
                        <div className="step-info">
                            <h3>Share Your Profile Context</h3>
                            <p>Mention details like your age, state, daily occupation, or income margin to get custom recommendations matched directly to you.</p>
                        </div>
                    </div>

                    <div className="step-card">
                        
                        <div className="step-info">
                            <h3>Understand Eligibility Instantly</h3>
                            <p>Our engine instantly interprets age limits, cross-state combinations, and threshold baselines so you save hours of research.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AiAssistant;