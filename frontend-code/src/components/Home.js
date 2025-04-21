import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 className="title">Bloom Well</h1>
      <h4 className="tagline">
        "When things change inside you, things change around you"
      </h4>
      <img src="/background.jpg" alt="Mind Blooming" className="bg-image" />
    </div>
  );
}

export default Home;
