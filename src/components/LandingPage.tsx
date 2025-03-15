import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Set authentication and navigate to dashboard
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">Family Finance Management</div>
        <div className="nav-right">
          <button className="nav-btn signup-btn" onClick={handleGetStarted}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Family Finance Management</h1>
          <p className="hero-subtitle">
            Transform your family's financial future with our comprehensive management platform. Expertly designed to help you budget, invest, and secure long-term prosperity through intelligent financial planning.
          </p>
          <div className="button-group">
            <button 
              className="get-started-btn" 
              onClick={handleGetStarted}
            >
              Get Started
            </button>
            <button className="nav-btn login-btn" onClick={handleGetStarted}>
              Login
            </button>
          </div>
        </div>
        <div className="hero-image">
          <svg className="finance-illustration" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            {/* Background */}
            <rect width="800" height="600" fill="#f0f9ff"/>
            
            {/* Home Shape */}
            <path d="M200 200 L400 100 L600 200 L600 450 L200 450 Z" fill="#e2e8f0" stroke="#2563eb" strokeWidth="2"/>
            <rect x="350" y="350" width="100" height="100" fill="#2563eb" opacity="0.1"/>
            
            {/* Family Group */}
            <g transform="translate(400, 300)">
              {/* Parent 1 */}
              <g transform="translate(-80, 0)">
                <circle cx="0" cy="-40" r="25" fill="#2563eb"/>
                <path d="M-15 -45 L15 -45" stroke="white" strokeWidth="3"/> {/* Smile */}
                <path d="M-10 -50 L-10 -48 M10 -50 L10 -48" stroke="white" strokeWidth="3"/> {/* Eyes */}
                <path d="M0 -15 L0 50" stroke="#2563eb" strokeWidth="8"/> {/* Body */}
                <path d="M0 0 L-30 30 M0 0 L30 30" stroke="#2563eb" strokeWidth="8"/> {/* Arms */}
                <path d="M0 50 L-20 90 M0 50 L20 90" stroke="#2563eb" strokeWidth="8"/> {/* Legs */}
              </g>

              {/* Parent 2 */}
              <g transform="translate(80, 0)">
                <circle cx="0" cy="-40" r="25" fill="#2563eb"/>
                <path d="M-15 -45 L15 -45" stroke="white" strokeWidth="3"/> {/* Smile */}
                <path d="M-10 -50 L-10 -48 M10 -50 L10 -48" stroke="white" strokeWidth="3"/> {/* Eyes */}
                <path d="M0 -15 L0 50" stroke="#2563eb" strokeWidth="8"/> {/* Body */}
                <path d="M0 0 L-30 30 M0 0 L30 30" stroke="#2563eb" strokeWidth="8"/> {/* Arms */}
                <path d="M0 50 L-20 90 M0 50 L20 90" stroke="#2563eb" strokeWidth="8"/> {/* Legs */}
              </g>

              {/* Child 1 */}
              <g transform="translate(-30, 20)">
                <circle cx="0" cy="-30" r="20" fill="#2563eb"/>
                <path d="M-12 -35 L12 -35" stroke="white" strokeWidth="3"/> {/* Smile */}
                <path d="M-8 -40 L-8 -38 M8 -40 L8 -38" stroke="white" strokeWidth="3"/> {/* Eyes */}
                <path d="M0 -10 L0 40" stroke="#2563eb" strokeWidth="6"/> {/* Body */}
                <path d="M0 5 L-20 25 M0 5 L20 25" stroke="#2563eb" strokeWidth="6"/> {/* Arms */}
                <path d="M0 40 L-15 70 M0 40 L15 70" stroke="#2563eb" strokeWidth="6"/> {/* Legs */}
              </g>

              {/* Child 2 */}
              <g transform="translate(30, 20)">
                <circle cx="0" cy="-30" r="20" fill="#2563eb"/>
                <path d="M-12 -35 L12 -35" stroke="white" strokeWidth="3"/> {/* Smile */}
                <path d="M-8 -40 L-8 -38 M8 -40 L8 -38" stroke="white" strokeWidth="3"/> {/* Eyes */}
                <path d="M0 -10 L0 40" stroke="#2563eb" strokeWidth="6"/> {/* Body */}
                <path d="M0 5 L-20 25 M0 5 L20 25" stroke="#2563eb" strokeWidth="6"/> {/* Arms */}
                <path d="M0 40 L-15 70 M0 40 L15 70" stroke="#2563eb" strokeWidth="6"/> {/* Legs */}
              </g>
            </g>

            {/* Heart connecting family */}
            <path d="M320 280 Q400 220 480 280" fill="none" stroke="#2563eb" strokeWidth="3"/>

            {/* Financial Elements */}
            <g>
              {/* Piggy Bank */}
              <circle cx="250" cy="200" r="30" fill="#22c55e" opacity="0.2"/>
              <text x="240" y="210" fill="#22c55e" fontSize="24" fontWeight="bold">$</text>
              
              {/* Growth Chart */}
              <path d="M550 200 L550 150 L600 150" fill="none" stroke="#22c55e" strokeWidth="3"/>
              <polygon points="590,140 590,160 610,150" fill="#22c55e"/>
            </g>

            {/* Stars/Sparkles around family */}
            <g>
              <path d="M300 150 L310 150 L305 140 Z" fill="#2563eb"/>
              <path d="M500 150 L510 150 L505 140 Z" fill="#2563eb"/>
              <path d="M400 180 L410 180 L405 170 Z" fill="#2563eb"/>
            </g>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Smart Budgeting</h3>
            <p>Create and manage budgets that work for your entire family</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Expense Tracking</h3>
            <p>Monitor spending patterns and track expenses in real-time</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Financial Goals</h3>
            <p>Set and achieve family financial goals together</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Family Finance Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage; 