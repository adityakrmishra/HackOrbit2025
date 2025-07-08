import torch
import os
import cv2
import numpy as np
import torch.nn as nn

class VideoClassifier(nn.Module):
    def __init__(self):
        super(VideoClassifier, self).__init__()
        self.net = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, stride=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1)),
            nn.Flatten(),
            nn.Linear(64, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.net(x)

def preprocess_video_frames(video_path, size=(224, 224)):
    cap = cv2.VideoCapture(video_path)
    frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.resize(frame, size)
        frame = frame.astype(np.float32) / 255.0
        tensor = torch.tensor(frame).permute(2, 0, 1)  # HWC to CHW
        frames.append(tensor)
    cap.release()
    return frames

class VideoDataset(torch.utils.data.Dataset):
    def __init__(self, frame_folder):
        self.files = [os.path.join(frame_folder, f) for f in os.listdir(frame_folder) if f.endswith(".jpg")]

    def __len__(self):
        return len(self.files)

    def __getitem__(self, idx):
        img = cv2.imread(self.files[idx])
        img = cv2.resize(img, (224, 224)).astype(np.float32) / 255.0
        img_tensor = torch.tensor(img).permute(2, 0, 1)
        label = 1 if "fake" in self.files[idx] else 0
        return img_tensor, torch.tensor([label]).float()
