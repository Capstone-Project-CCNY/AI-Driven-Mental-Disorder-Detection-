import torch
import torchvision.transforms as transforms
import torch.nn.functional as F
from flask import Flask, request, jsonify
from PIL import Image
import io
import base64
import os
import numpy as np
import mediapipe as mp
from flask_cors import CORS

# === Config ===
MODEL_PATH = os.path.join("model", "emotion_model_ts.pt")
CONFIDENCE_THRESHOLD = 0.65
GLOBAL_LABELS = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']

# === Init ===
app = Flask(__name__)
CORS(app)
model = torch.jit.load(MODEL_PATH, map_location="cpu")
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5]*3, [0.5]*3)
])

# === Face detection ===
mp_face = mp.solutions.face_detection

def crop_face(image):
    image_np = np.array(image)
    with mp_face.FaceDetection(model_selection=1, min_detection_confidence=0.5) as face_det:
        results = face_det.process(image_np)
        if results.detections:
            box = results.detections[0].location_data.relative_bounding_box
            h, w, _ = image_np.shape
            x1 = max(int(box.xmin * w) - 20, 0)
            y1 = max(int(box.ymin * h) - 20, 0)
            x2 = min(x1 + int(box.width * w) + 40, w)
            y2 = min(y1 + int(box.height * h) + 40, h)
            cropped = image_np[y1:y2, x1:x2]
            return Image.fromarray(cropped)
    return image  # fallback

# === Routes ===
@app.route('/')
def home():
    return "Emotion model is alive!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data or 'image' not in data:
        return jsonify({"error": "Missing image field"}), 400

    try:
        # Decode base64 image
        image_data = base64.b64decode(data['image'])
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        # Crop face (if possible)
        image = crop_face(image)

        # Preprocess
        img_tensor = transform(image).unsqueeze(0)

        # Predict
        with torch.no_grad():
            output = model(img_tensor)
            probs = F.softmax(output, dim=1).squeeze()
            conf, pred_idx = torch.max(probs, dim=0)
            label = GLOBAL_LABELS[pred_idx.item()]

            # Top 3
            topk_probs, topk_indices = torch.topk(probs, 3)
            top3 = [
                {"label": GLOBAL_LABELS[i.item()], "score": float(p)}
                for i, p in zip(topk_indices, topk_probs)
            ]

            risk_map = {
                "happy": "Low Risk",
                "neutral": "Low Risk",
                "surprise": "Low Risk",
                "sad": "High Risk",
                "fear": "High Risk",
                "angry": "High Risk",
                "disgust": "High Risk"
            }

            final_label = label if conf >= CONFIDENCE_THRESHOLD else "uncertain"
            risk_status = risk_map.get(final_label, "Unknown")

            result = {
                "label": final_label,
                "confidence": float(conf),
                "top_3": top3,
                "mental_risk": risk_status
            }

            return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === Local test ===
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
