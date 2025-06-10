import React, { useState } from 'react';
import { getImagePath } from '../utils/getImagePath';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <img 
            src={getImagePath('umbrella7-slate2.png')}
            alt="Umbrella 7" 
            className="login-logo"
          />
          <h1 className="login-title">Welcome to Umbrella 7</h1>
          <p className="login-subtitle">Sign in to your account</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
          
          <p className="login-footer">
            Don't have an account? <a href="mailto:contact@umbrella7.ai">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;