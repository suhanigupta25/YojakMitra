import "./Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-container">
                {/* Brand & Mission Brief */}
                <div className="footer-brand-section">
                    <span className="footer-logo">YojnaMitra</span>
                    <p className="footer-tagline">
                        Simplifying civic welfare and public schemes through context-aware design.
                    </p>
                </div>

                {/* Compact Links Array */}
                <div className="footer-links-grid">
                    <div className="footer-link-group">
                        <h4>Platform</h4>
                        <a href="#schemes">Explore Schemes</a>
                        <a href="#assistant">AI Assistant</a>
                        <a href="#updates">Bylaw Tracker</a>
                    </div>
                    <div className="footer-link-group">
                        <h4>Organization</h4>
                        <a href="#about">Our Mission</a>
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                    </div>
                </div>
            </div>

            {/* Bottom Row / Copyright & Meta */}
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p>&copy; {currentYear} YojnaMitra. Built with care for inclusive access.</p>
                    <div className="footer-status-indicator">
                        <span className="status-ping"></span>
                        <p>All central services operational</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;