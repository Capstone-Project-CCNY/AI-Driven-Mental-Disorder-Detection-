import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import backgroundImage from "../assets/bg.jpeg";

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.state?.flip !== "login");
  const [message, setMessage] = useState(""); // For message text
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmSignupPassword, setConfirmSignupPassword] = useState("");
  const [error, setError] = useState("");
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    fetch(`http://localhost:5000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          setError("");
          navigate("/Dashboard");
        } else {
          setError("Invalid credentials");
          alert("Invalid credentials");
        }
      })
      .catch((error) => {
        setError("An error occurred");
        alert("An error occurred");
      });

    setFirstName("");
    setLastName("");
    setSignupEmail("");
    setSignupPassword("");
    setConfirmSignupPassword("");
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (
      !firstName.trim() ||
      !signupEmail.trim() ||
      !signupPassword.trim() ||
      !confirmSignupPassword.trim()
    ) {
      setError("All fields are required");
      alert("All fields are required");
      return;
    }

    if (signupPassword !== confirmSignupPassword) {
      setError("Passwords do not match");
      alert("Passwords do not match");
      return;
    }

    fetch(`http://localhost:5000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signupEmail,
        password: signupPassword,
        firstName: firstName,
        lastName: lastName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Signup successful! Please log in.");
        setFirstName("");
        setLastName("");
        setSignupEmail("");
        setSignupPassword("");
        setConfirmSignupPassword("");
      })
      .catch((error) => {
        setError("An error occurred");
        alert("An error occurred");
      });
  };

  return (
    <div
      className="signup-container"
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
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Let’s go!</button>
            </form>
          </div>

          {/* Sign up */}
          <div className="flip-card-back">
            <h2>Sign up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmSignupPassword}
                onChange={(e) => setConfirmSignupPassword(e.target.value)}
              />
              <button type="submit">Confirm!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
