import React, { useState } from "react";
import "../styles/SignIn.css";
import backgroundImage from "../assets/bg.png";

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div
      className="signin-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <div className="toggle-wrapper">
        <span
          onClick={() => setIsSignUp(false)}
          className={!isSignUp ? "active" : ""}
        >
          Log in
        </span>
        <label className="switch">
          <input
            type="checkbox"
            checked={isSignUp}
            onChange={() => setIsSignUp(!isSignUp)}
          />
          <span className="slider" />
        </label>
        <span
          onClick={() => setIsSignUp(true)}
          className={isSignUp ? "active" : ""}
        >
          Sign up
        </span>
      </div>

      <div className={`flip-card ${isSignUp ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          {/* Log in */}
          <div className="flip-card-front">
            <h2>Log in</h2>
            <form>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Let’s go!</button>
            </form>
          </div>

          {/* Sign up */}
          <div className="flip-card-back">
            <h2>Sign up</h2>
            <form>
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <button type="submit">Confirm!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
