import cv2
import os

def extract_frames(video_path, output_dir, fps_interval=1):
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        raise ValueError(f"Cannot open video file: {video_path}")

    fps = int(cap.get(cv2.CAP_PROP_FPS))
    interval = max(1, int(fps / fps_interval))
    frame_idx = 0
    saved_idx = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if frame_idx % interval == 0:
            frame_path = os.path.join(output_dir, f"frame_{saved_idx:04d}.jpg")
            cv2.imwrite(frame_path, frame)
            saved_idx += 1
        frame_idx += 1

    cap.release()
    print(f"Extracted {saved_idx} frames from {video_path} into {output_dir}")
