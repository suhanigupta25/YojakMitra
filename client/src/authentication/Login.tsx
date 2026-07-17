import React, { useState } from 'react';
import './AuthPages.css';

interface LoginUserDTO{
    username: string;
    password: string;
}

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginUserDTO>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Handle your Access & Refresh JWT Tokens securely
      localStorage.setItem('refreshToken', data.refreshToken);
      // Tip: Access tokens are best kept in memory or application state context
      sessionStorage.setItem('accessToken', data.accessToken); 

      // Redirect user to dashboard / search screen
      window.location.href = '/search';
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to track and compare schemes</p>
        </div>

        {error && <div className="auth-error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              required
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <a href="/signup" className="auth-link">Create one here</a>
        </div>
      </div>
    </div>
  );
};