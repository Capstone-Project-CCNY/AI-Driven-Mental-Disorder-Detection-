import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="overlay" />

      <div className="home-heading-container">
        <h1 className="home-heading">Bloom Well</h1>
        <p className="home-tagline">
          – When things change inside you, things change around you
        </p>
      </div>

      <div className="home-main-content">
        <section className="home-intro fade-in">
          <p>
            Welcome to <strong>Bloom Well</strong> – an AI-powered platform
            dedicated to helping you track emotional well-being through facial
            expression analysis. Whether you're checking in with yourself or
            supporting others, our tools offer insight and awareness that
            matter.
          </p>
        </section>

        <section className="home-buttons fade-in">
          <button className="btn-get-started">Get Started</button>
          <button className="btn-signin" onClick={() => navigate("/SignIn")}>
            Sign In
          </button>
        </section>

        <section className="home-steps fade-in">
          <h3>How It Works</h3>
          <ul>
            <li>
              <strong>1. Upload or Capture a Video</strong> : Using your webcam
              or a recorded file.
            </li>
            <li>
              <strong>2. Our AI Analyzes Your Expression</strong> : Detecting
              emotions through facial cues.
            </li>
            <li>
              <strong>3. Get a Report</strong> : Understand emotional trends and
              get feedback.
            </li>
          </ul>
        </section>

        <section className="home-benefits fade-in">
          <h3>Why Choose Bloom Well?</h3>
          <ul>
            <li>✅ Private, secure, and real-time analysis</li>
            <li>✅ Easy to use, no sign-in needed to start</li>
            <li>✅ Designed for awareness and mental wellness</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Home;
