from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from send_to_drive import upload_to_drive

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/predict", methods=["POST"])
def predict():
    video = request.files["video"]
    filename = secure_filename("input_video.webm")
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    video.save(filepath)

    try:
        drive_file_id = upload_to_drive(filepath, filename)
        return jsonify({"message": "Video uploaded", "drive_file_id": drive_file_id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
