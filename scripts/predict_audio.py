import torch
import numpy as np
from utils.audio_utils import AudioClassifier, preprocess_audio

def predict(audio_path):
    model = AudioClassifier()
    model.load_state_dict(torch.load("models/audio_model.pth"))
    model.eval()

    features = preprocess_audio(audio_path)
    with torch.no_grad():
        output = model(features.unsqueeze(0))
    print(f"Audio deepfake probability: {output.item():.2f}")


# predict_video.py
import torch
import os
from utils.video_utils import VideoClassifier, preprocess_video

def predict(video_dir):
    model = VideoClassifier()
    model.load_state_dict(torch.load("models/video_model.pth"))
    model.eval()

    frames = preprocess_video(video_dir)
    scores = []
    with torch.no_grad():
        for frame in frames:
            output = model(frame.unsqueeze(0))
            scores.append(output.item())
    print(f"Video deepfake score: {sum(scores)/len(scores):.2f}")


# fuse.py
import json
from predict_audio import predict as predict_audio
from predict_video import predict as predict_video

def fuse(audio_file, video_dir):
    print("Running audio model...")
    audio_score = predict_audio(audio_file)
    print("Running video model...")
    video_score = predict_video(video_dir)

    fused = 0.4 * audio_score + 0.6 * video_score
    result = {
        "audio_score": audio_score,
        "video_score": video_score,
        "fused_score": fused
    }
    with open("fused_output.json", "w") as f:
        json.dump(result, f, indent=2)
    print("Fusion complete. Output saved to fused_output.json")

if __name__ == "__main__":
    fuse("sample_audio.wav", "data/processed/frames")
