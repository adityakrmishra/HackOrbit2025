import os
import librosa
import numpy as np
import soundfile as sf

def extract_mel_spectrogram(audio_path, output_path, sr=16000):
    y, _ = librosa.load(audio_path, sr=sr)
    mel_spec = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128)
    log_mel = librosa.power_to_db(mel_spec, ref=np.max)
    np.save(output_path, log_mel)

def main():
    input_dir = "data/raw"
    output_dir = "data/processed/audio"
    os.makedirs(output_dir, exist_ok=True)

    for file in os.listdir(input_dir):
        if file.endswith(".wav") or file.endswith(".mp4"):
            name = os.path.splitext(file)[0]
            audio_path = os.path.join(input_dir, file)
            output_path = os.path.join(output_dir, f"{name}.npy")
            extract_mel_spectrogram(audio_path, output_path)
            print(f"Extracted mel-spectrogram for {file}")

if __name__ == "__main__":
    main()


# extract_frames.py
import os
import cv2

def extract_frames(video_path, output_dir, interval=1):
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    saved_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % interval == 0:
            frame_path = os.path.join(output_dir, f"frame_{saved_count:04d}.jpg")
            cv2.imwrite(frame_path, frame)
            saved_count += 1
        frame_count += 1
    cap.release()
    print(f"Extracted {saved_count} frames from {video_path}")
