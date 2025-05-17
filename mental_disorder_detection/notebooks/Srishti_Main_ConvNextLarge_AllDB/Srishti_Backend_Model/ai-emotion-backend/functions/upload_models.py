from huggingface_hub import upload_file

repo_id = "Srishti1116/ai-emotion-models"

# Upload PyTorch model
pt_path = "functions/model/emotion_model_ts.pt"
pt_dest = upload_file(
    path_or_fileobj=pt_path,
    path_in_repo="emotion_model_ts.pt",
    repo_id=repo_id,
    repo_type="model"
)
print(f" Uploaded: {pt_dest}")

# Upload ONNX model
onnx_path = "functions/model/Converted/emotion_model.onnx"
onnx_dest = upload_file(
    path_or_fileobj=onnx_path,
    path_in_repo="emotion_model.onnx",
    repo_id=repo_id,
    repo_type="model"
)
print(f" Uploaded: {onnx_dest}")

# Upload TensorFlow model ZIP
zip_path = "functions/model/Converted/emotion_tf_model.zip"
zip_dest = upload_file(
    path_or_fileobj=zip_path,
    path_in_repo="emotion_tf_model.zip",
    repo_id=repo_id,
    repo_type="model"
)
print(f" Uploaded: {zip_dest}")
