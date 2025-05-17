from huggingface_hub import hf_hub_download

repo_id = "Srishti1116/ai-emotion-models"

# Download PyTorch model (.pt)
pt_model_path = hf_hub_download(repo_id=repo_id, filename="emotion_model_ts.pt")
print("Downloaded PyTorch model to:", pt_model_path)

# Download ONNX model
onnx_model_path = hf_hub_download(repo_id=repo_id, filename="emotion_model.onnx")
print("Downloaded ONNX model to:", onnx_model_path)

# Download TensorFlow ZIP
tf_model_zip_path = hf_hub_download(repo_id=repo_id, filename="emotion_tf_model.zip")
print("Downloaded TF ZIP to:", tf_model_zip_path)
