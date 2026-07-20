import React, { useState } from 'react';
import './AuthPages.css';

export const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Map properties to meet exact structural types
    const payload = {
      ...formData,
      age: Number(formData.age), // Ensuring correct type casting
    };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Try changing values.');
      }

      // Automatically store returned initial tokens upon account creation
      localStorage.setItem('refreshToken', data.refreshToken);
      sessionStorage.setItem('accessToken', data.accessToken);

      window.location.href = '/search';
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Enter details to match schemes instantly</p>
        </div>

        {error && <div className="auth-error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSignupSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Jiya Desai"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                className="form-input"
                required
                min="1"
                max="120"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="25"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                className="form-select"
                required
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

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
              placeholder="jiya15438"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
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
              minLength={6}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <a href="/login" className="auth-link">Sign In</a>
        </div>
      </div>
    </div>
  );
};