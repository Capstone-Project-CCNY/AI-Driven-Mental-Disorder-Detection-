import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import "./App.css";

const API_URL = "http://127.0.0.1:5000/predict";

function App() {
  const webcamRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const captureFromWebcam = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImagePreview(screenshot);
    sendToAPI(screenshot.split(",")[1]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      sendToAPI(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const sendToAPI = async (base64Image) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🧠 AI Emotion & Mental Health Detector</h1>

      <div className="input-section">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
          mirrored
        />
        <br />
        <button onClick={captureFromWebcam}>📸 Capture From Camera</button>
        <p>or</p>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </div>

      {loading && <p>Analyzing...</p>}

      {imagePreview && (
        <div className="preview">
          <img src={imagePreview} alt="Preview" width={200} />
        </div>
      )}

      {result && (
        <div className="result">
          <h3>📝 Result:</h3>
          <p><strong>Emotion:</strong> {result.label}</p>
          <p><strong>Confidence:</strong> {result.confidence.toFixed(3)}</p>
          <p><strong>Mental Risk:</strong> {result.mental_risk}</p>
          <p><strong>Top 3 Predictions:</strong></p>
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

export default App;
