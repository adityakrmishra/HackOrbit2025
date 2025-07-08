import torch
import librosa
import numpy as np
import os
import soundfile as sf
import torch.nn as nn

class AudioClassifier(nn.Module):
    def __init__(self):
        super(AudioClassifier, self).__init__()
        self.net = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, stride=1),
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

def preprocess_audio(audio_path, sr=16000):
    y, _ = librosa.load(audio_path, sr=sr)
    mel = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128)
    log_mel = librosa.power_to_db(mel, ref=np.max)
    tensor = torch.tensor(log_mel).unsqueeze(0).unsqueeze(0).float()
    return tensor

class AudioDataset(torch.utils.data.Dataset):
    def __init__(self, folder):
        self.files = [os.path.join(folder, f) for f in os.listdir(folder) if f.endswith(".npy")]

    def __len__(self):
        return len(self.files)

    def __getitem__(self, idx):
        x = np.load(self.files[idx])
        y = 1 if "fake" in self.files[idx] else 0
        return torch.tensor(x).unsqueeze(0).float(), torch.tensor([y]).float()
