<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './ProfilePage.css';
import { API_BASE_URL } from '../api';
=======
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './ProfilePage.css';
>>>>>>> ab8c959a84e04d703a3ec36e4b66ab19446fcdb7

export interface RegisteredUser {
  name: string;
  age: number;
  gender: string;
  username: string;
  email: string;
}

<<<<<<< HEAD
=======
const API_URL = 'http://localhost:5000';

>>>>>>> ab8c959a84e04d703a3ec36e4b66ab19446fcdb7
export const ProfilePage = () => {
  const [user, setUser] = useState<RegisteredUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem('accessToken');

      if (!token) {
        setError('You need to log in to view your profile.');
        setLoading(false);
        return;
      }

      try {
<<<<<<< HEAD
        const response = await fetch(`${API_BASE_URL}/profile`, {
=======
        const response = await fetch(`${API_URL}/profile`, {
>>>>>>> ab8c959a84e04d703a3ec36e4b66ab19446fcdb7
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load profile.');
        }

        setUser(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unable to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="espresso-theme profile-container">
        <div className="espresso-card" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Loading profile...</h2>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="espresso-theme profile-container">
        <div className="espresso-card" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>No Profile Data Found</h2>
          <p>{error || 'Please log in to view your profile details.'}</p>
          <NavLink to="/login" className="auth-link">Go to Login</NavLink>
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