import React from "react";
import("../styles/SignIn.css");

function SignIn() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <div className="signin-container">
        <h2 className="signin-title">Sign In Page</h2>
      </div>
      <p>This is where users will sign in.</p>
    </div>
  );
}

export default SignIn;
