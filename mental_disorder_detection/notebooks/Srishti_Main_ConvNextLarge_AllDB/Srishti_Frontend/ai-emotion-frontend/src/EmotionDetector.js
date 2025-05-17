import React, { useState } from "react";

function EmotionDetector() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result.split(",")[1]); // base64
    };
    reader.readAsDataURL(file);
  };

  const sendToServer = async () => {
    if (!image) return alert("Please upload an image first.");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "auto" }}>
      <h2> AI Emotion & Mental Health Detector</h2>

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br /><br />
      <button onClick={sendToServer} disabled={loading}>
        {loading ? "Analyzing..." : "Detect Emotion"}
      </button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h3> Result:</h3>
          <p><strong>Emotion:</strong> {result.label}</p>
          <p><strong>Confidence:</strong> {result.confidence.toFixed(3)}</p>
          <p><strong>Mental Risk:</strong> {result.mental_risk}</p>

          <h4>Top 3 Predictions:</h4>
          <ul>
            {result.top_3.map((item, idx) => (
              <li key={idx}>
                {item.label} ({(item.score * 100).toFixed(2)}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EmotionDetector;
