import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

export interface RegisteredUser {
  name: string;
  age: number;
  gender: string;
  username: string;
  email: string;
  password?: string;
}

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<RegisteredUser | null>(() => {
    const savedUser = localStorage.getItem('registeredUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [showPassword, setShowPassword] = useState(false);

  if (!user) {
    return (
      <div className="espresso-theme profile-container">
        <div className="espresso-card" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>No Profile Data Found</h2>
          <p>Please complete the signup form to view your profile details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="espresso-theme profile-container">
      <header className="profile-banner">
        <div className="banner-overlay"></div>
        <div className="profile-hero">
          <div className="avatar-wrapper">
            <div className="avatar-placeholder">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="badge-verified" title="Verified Account">
              ✓
            </span>
          </div>
          <div className="hero-text">
            <h1 className="user-name">{user.name}</h1>
            <p className="user-handle">@{user.username}</p>
          </div>
        </div>
      </header>

      {/* User Details Grid */}
      <main className="profile-details-grid">
        <div className="espresso-card">
          <h2 className="card-title">Account Details</h2>
          <div className="info-list">
            <div className="info-item">
              <span className="info-label">Full Name</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Username</span>
              <span className="info-value">@{user.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Password</span>
              <span className="info-value password-field">
                {showPassword ? (user.password || '••••••••') : '••••••••'}
                {user.password && (
                  <button
                    type="button"
                    className="toggle-pwd-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="espresso-card">
          <h2 className="card-title">Demographics & Details</h2>
          <div className="info-list">
            <div className="info-item">
              <span className="info-label">Age</span>
              <span className="info-value">{user.age} Years</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender</span>
              <span className="info-value">{user.gender}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;