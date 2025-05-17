# AI Emotion Detection Models

This repository hosts pretrained models used for facial expression-based mental health screening. Models were trained to detect core emotions and can be used for downstream tasks such as depression or anxiety risk detection.

Hosted on: [Hugging Face Model Hub](https://huggingface.co/Srishti1116/ai-emotion-models)

##  Available Models

| Model                | File Name              | Format    | Size   | Use Case                   |
|---------------------|------------------------|-----------|--------|----------------------------|
| PyTorch Scripted     | `emotion_model_ts.pt`   | `.pt`     | ~789MB | PyTorch inference          |
| ONNX Export          | `emotion_model.onnx`    | `.onnx`   | ~788MB | Cross-framework inference  |
| TensorFlow SavedModel| `emotion_tf_model.zip`  | `.zip`    | ~731MB | TensorFlow / TFLite usage  |

---

## Usage Example (Download in Code)

Install the Hugging Face Hub client:

```bash
pip install huggingface_hub


#Input size: 224x224 RGB

#Emotion classes: ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']

#Base architecture: ConvNeXt-Large

#Fine-tuned for: facial expression classification