import "./Hero.css"

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="tagline">Powered By AI</div>
                
                <div className="displayinfo">
                    <h1>Discover Government Schemes <span className="gradient-text">Made for You</span></h1>
                    <p className="hero-subtitle">
                        YojnaMitra uses AI to match you with the right central and state government welfare schemes based on your profile — instantly and accurately.
                    </p>           
                </div>

                <div className="hero-actions">
                    <button className="btn-primary">Find My Schemes</button>
                    <button className="btn-secondary">Explore All Schemes</button>
                </div>

                <div className="displaydata">
                    <div className="stat-item">
                        <span className="stat-number">1.2M+</span>
                        <span className="stat-label">Users Assisted</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">28 States</span>
                        <span className="stat-label">Coverage</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">100% Free</span>
                        <span className="stat-label">Always Open-Source</span>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Hero;