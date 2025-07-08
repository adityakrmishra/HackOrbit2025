# AI‑Powered Multilingual Deepfake Detection

##  Overview  
Deepfake audio/video are increasingly used for misinformation, fraud, and reputational damage. Existing solutions often lack support for Indian languages and real‑time operation. This project builds a modular, real‑time AI pipeline to detect deepfakes across multiple Indian languages (Hindi, Bengali, Tamil, Telugu, etc.) and modalities (audio, image, video).

---

##  Goals  
- **Multilingual Support**: Detect deepfakes in Indian dialects using low‐resource voice datasets and transfer learning.  
- **Real‑Time Detection**: Frame‑level and audio‐segment‑level inference with timestamped alerts.  
- **Multimodal Fusion**: Combine audio and video classifiers via late fusion for robust detection.  
- **Explainability**: Produce confidence heatmaps and frame overlays to help users interpret model decisions.  
- **Edge Compatibility**: Light‑weight deployment with model pruning and quantization.

---

##  File Structure

```
deepfake-detection/
├── README.md
├── requirements.txt
├── data/
│ ├── raw/ # Original real/fake videos & audio
│ └── processed/ # .npy mel‑spectrograms & extracted frames
├── models/
│ ├── audio_model.pth
│ ├── video_model.pth
│ └── fusion_weights.json
├── scripts/
│ ├── extract_audio.py
│ ├── extract_frames.py
│ ├── train_audio.py
│ ├── train_video.py
│ ├── predict_audio.py
│ ├── predict_video.py
│ └── fuse.py
├── app/
│ ├── app.py # FastAPI server (/analyze, /health)
│ └── Dockerfile
├── dashboard/
│ ├── dashboard.py # Streamlit front‑end
│ └── assets/ # UI demo images/GIFs
├── utils/
│ ├── audio_utils.py
│ ├── video_utils.py
│ └── viz_utils.py
├── demo/
│ ├── sample_real.mp4
│ ├── sample_fake.mp4
│ └── demo_script.md
└── logs/ # Training & API logs
```


---

##  Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/deepfake-detection.git
cd deepfake-detection
pip install -r requirements.txt
```

### 2. Prepare Data
Place raw “real” and “fake” videos/audio under data/raw/.

Run preprocessing:
```
python scripts/extract_audio.py --input data/raw/ fake_or_real.mp4 \
                               --output data/processed/audio/
python scripts/extract_frames.py --input data/raw/fake_or_real.mp4 \
                                --output data/processed/frames/
```

### 3. Train Models
- Audio:
  ```
  python scripts/train_audio.py \
  --data-dir data/processed/audio/ \
  --output models/audio_model.pth



- Video:
  ```
  python scripts/train_video.py \
  --data-dir data/processed/frames/ \
  --output models/video_model.pth

### 4. Run Inference & Fusion
```
python scripts/predict_audio.py --model=models/audio_model.pth \
                               --input sample_audio.wav
python scripts/predict_video.py --model=models/video_model.pth \
                               --input sample_video.mp4
python scripts/fuse.py --audio-score audio.json \
                       --video-score video.json \
                       --output fused_output.json
```


### 5. Launch API & Dashboard

```
\# Start FastAPI backend
uvicorn app.app:app --reload

# In a new terminal, launch Streamlit UI
streamlit run dashboard/dashboard.py
```

## Key Components
1 Pre‑processing
- Frame extraction via OpenCV
- Audio separation & mel‑spectrograms via librosa

2 Feature Extraction

- Audio: 1‑channel mel‑spectrogram + voice embeddings

- Video: CNN‑based visual features (XceptionNet, face forgery indicators)

3 Multimodal Classification

- Two parallel classifiers (audio & video)

- Late fusion ensemble → final deepfake probability

4 Explainability & Visualization

- Frame‑level bounding boxes (red highlights)

- Audio heatmaps over time

- Timestamped alerts in dashboard
5 Optimization & Deployment

- Model pruning & quantization for edge devices

- Dockerfile for containerization



## Features & Novelty
- Multilingual: Supports Hindi, Bengali, Tamil, Telugu, etc.

- Real‑Time Alerts: Live dashboard with confidence overlays.

- Modality Fusion: Audio + video checks for higher reliability.

- Explainability: Transparent indicators and heatmaps.

- Custom Dataset Synthesis: Augmented low‑resource dialect samples.

 ## Drawbacks & Showstoppers
- Data Scarcity: May need synthetic deepfake data for under‑represented dialects.

- Compute Constraints: Multimodal fusion is resource‑intensive.

- Latency: Real‑time inference across modalities can introduce delays.

- Robustness: New adversarial formats may bypass detectors.

- Ethical/Legal: Privacy & consent in data collection.

## Future Work
- Expand language support to more regional dialects.

- Integrate adversarial‐training for stronger robustness.

- Optimize end‑to‑end latency (<100 ms per second of video).

- Build a mobile/edge SDK for on‑device detection.

