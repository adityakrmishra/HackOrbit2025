import torch
import os
import cv2
import numpy as np
from utils.video_utils import VideoClassifier, preprocess_video_frames

def predict_video(video_path):
    model = VideoClassifier()
    model.load_state_dict(torch.load("models/video_model.pth"))
    model.eval()

    frames = preprocess_video_frames(video_path)
    scores = []

    with torch.no_grad():
        for frame in frames:
            input_tensor = frame.unsqueeze(0)  # Add batch dim
            prob = model(input_tensor).item()
            scores.append(prob)

    avg_score = np.mean(scores)
    print(f"Video deepfake probability: {avg_score:.3f}")
    return avg_score
