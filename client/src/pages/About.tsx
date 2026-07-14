import React from 'react';
import './Aboutus.css'; // Importing the corresponding stylesheet

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatItemProps {
  value: string;
  label: string;
}

export default function AboutUs() {
  return (
    <div className="about-page-container">
      
      <section className="hero-section">
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span className="badge">About YojnaMitra AI</span>
          <h1 className="hero-title">
            Bridging the Gap Between <span className="gradient-text">Citizens & Welfare</span>
          </h1>
          <p className="hero-description">
            Democratizing access to government welfare. We cut through bureaucratic complexity using advanced artificial intelligence to match you with the schemes you deserve.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="grid-container">
          
          <div>
            <h2 className="section-heading">Our Mission</h2>
            <p className="body-paragraph">
              Every year, billions in government benefits go unclaimed simply because eligible citizens don't know they exist or find the application processes too daunting to navigate independently.
            </p>
            <p className="body-paragraph">
              <strong>YojnaMitra AI</strong> was engineered to bridge that division. We integrate security-cleared semantic data processing with intuitive artificial intelligence to map regional, state, and national benefits directly to user profiles.
            </p>
            
            <div className="metrics-row">
              <StatItem value="1.2M+" label="Citizens Assisted" />
              <StatItem value="98%" label="Match Accuracy" />
              <StatItem value="24/7" label="Uptime Help" />
            </div>
          </div>

          <div className="features-grid">
            <FeatureCard 
              icon={
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795H14.48l1.018-5.205L6.518 15.904H9.813z" />
                </svg>
              }
              title="Eligibility Matcher"
              description="Input secure historical demographic vectors to locate central and state opportunities matching your profile immediately."
            />
            <FeatureCard 
              icon={
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.493 3h14.986m-14.986 3h14.986M5.437 3.75A2.25 2.25 0 003.25 6v12a2.25 2.25 0 002.187 2.25h13.126A2.25 2.25 0 0020.75 18V6a2.25 2.25 0 00-2.187-2.25H5.436z" />
                </svg>
              }
              title="Multilingual Framework"
              description="Erase administrative translation barriers. Access natural interaction pathways mapped perfectly into regional local dialects."
            />
            <FeatureCard 
              icon={
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              }
              title="Privacy Localized"
              description="Your data points remain explicitly secure. System rules match compliance constraints perfectly to guarantee explicit anonymity."
            />
            <FeatureCard 
              icon={
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h3.75a.75.75 0 01.75.75v1.125c0 .414.336.75.75.75h4.5a.75.75 0 01.75.75v10.125a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75.75V19.5a.75.75 0 01-.75.75h-3.75a.75.75 0 01-.75-.75v-1.125c0-.414-.336-.75-.75-.75h-4.5a.75.75 0 01-.75-.75V5.625a.75.75 0 01.75-.75h4.5a.75.75 0 01.75-.75V3a.75.75 0 01.75-.75z" />
                </svg>
              }
              title="Pipeline Checklist"
              description="Receive structured automation guidelines alongside interactive summaries ensuring error-free submissions."
            />
          </div>
        </div>
      </section>

      <section className="action-banner">
        <div className="banner-content">
          <h2 className="banner-heading">
            Seeking a specific public scheme?
            <span className="banner-subtext">Let our interface map it cleanly right now.</span>
          </h2>
          <div className="btn-container">
            <a href="#assistant" className="primary-btn">
              Launch Engine
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <div className="icon-wrapper">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}