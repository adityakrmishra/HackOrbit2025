import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from utils.audio_utils import AudioDataset, AudioClassifier

def train():
    dataset = AudioDataset("data/processed/audio")
    loader = DataLoader(dataset, batch_size=16, shuffle=True)
    model = AudioClassifier()
    criterion = nn.BCELoss()
    optimizer = optim.Adam(model.parameters(), lr=1e-4)

    for epoch in range(5):
        for X, y in loader:
            optimizer.zero_grad()
            out = model(X)
            loss = criterion(out, y)
            loss.backward()
            optimizer.step()
        print(f"Epoch {epoch+1} completed. Loss: {loss.item():.4f}")

    torch.save(model.state_dict(), "models/audio_model.pth")
    print("Audio model saved.")

if __name__ == "__main__":
    train()


# train_video.py
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from utils.video_utils import VideoDataset, VideoClassifier

def train():
    dataset = VideoDataset("data/processed/frames")
    loader = DataLoader(dataset, batch_size=16, shuffle=True)
    model = VideoClassifier()
    criterion = nn.BCELoss()
    optimizer = optim.Adam(model.parameters(), lr=1e-4)

    for epoch in range(5):
        for X, y in loader:
            optimizer.zero_grad()
            out = model(X)
            loss = criterion(out, y)
            loss.backward()
            optimizer.step()
        print(f"Epoch {epoch+1} completed. Loss: {loss.item():.4f}")

    torch.save(model.state_dict(), "models/video_model.pth")
    print("Video model saved.")

if __name__ == "__main__":
    train()
