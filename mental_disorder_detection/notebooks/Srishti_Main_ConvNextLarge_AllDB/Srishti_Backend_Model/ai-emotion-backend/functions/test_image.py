import base64
import requests
import sys
from PIL import Image

def encode_image_base64(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode("utf-8")

def predict(image_path):
    encoded = encode_image_base64(image_path)
    url = "http://127.0.0.1:5000/predict"
    headers = {"Content-Type": "application/json"}
    payload = {"image": encoded}

    print(f" Predicting for: {image_path}")
    try:
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 200:
            data = response.json()
            print(f"\n Predicted Emotion: {data['label']}")
            print(f" Confidence: {data['confidence']:.2f}")
            print(f" Top-3 Predictions:")
            for item in data['top_3']:
                print(f" - {item['label']}: {item['score']:.4f}")
        else:
            print(f" Server error: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f" Failed to connect to API: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 test_image.py <path_to_image>")
    else:
        predict(sys.argv[1])
