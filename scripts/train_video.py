import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from utils.video_utils import VideoDataset, VideoClassifier

def train_video_model():
    dataset = VideoDataset("data/processed/frames")
    loader = DataLoader(dataset, batch_size=8, shuffle=True)
    model = VideoClassifier()

    criterion = nn.BCELoss()
    optimizer = optim.Adam(model.parameters(), lr=1e-4)

    for epoch in range(1, 6):
        total_loss = 0
        for inputs, labels in loader:
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        print(f"Epoch {epoch} - Loss: {total_loss / len(loader):.4f}")

    torch.save(model.state_dict(), "models/video_model.pth")
    print("✅ Video model trained and saved to models/video_model.pth")

if __name__ == "__main__":
    train_video_model()
