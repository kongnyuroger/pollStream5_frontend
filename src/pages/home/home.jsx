import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">PollPulse</h1>
        <p className="home-subtitle">Real-time polling made simple</p>
      </header>
      <main className="home-main">
        <div className="home-intro">
          <p>Welcome to PollPulse, your go-to platform for real-time polling and interactive sessions.</p>
        </div>
        <div className="home-features">
          <div className="feature-item">
            <h3>Real-Time Results</h3>
            <p>Get instant feedback and see results as they happen.</p>
          </div>
          <div className="feature-item">
            <h3>Easy to Use</h3>
            <p>Simple and intuitive interface for both hosts and participants.</p>
          </div>
          <div className="feature-item">
            <h3>Engage Your Audience</h3>
            <p>Interactive polls, quizzes, and Q&A sessions to keep your audience engaged.</p>
          </div>
        </div>
        <div className="home-cta">
          <a href="/create-session" className="cta-button">Create a Session</a>
          <a href="/join-session" className="cta-button">Join a Session</a>
        </div>
      </main>
      <footer className="home-footer">
        <p>&copy; 2025 PollPulse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;