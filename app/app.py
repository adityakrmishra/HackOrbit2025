from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import shutil
import os
from fuse import fuse_predictions

app = FastAPI(title="Multilingual Deepfake Detection API")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "🚀 Deepfake Detection API is up and running."}

@app.post("/analyze")
def analyze_deepfake(audio: UploadFile = File(...), video: UploadFile = File(...)):
    audio_path = os.path.join(UPLOAD_DIR, audio.filename)
    video_path = os.path.join(UPLOAD_DIR, video.filename)

    # Save uploaded files
    with open(audio_path, "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)
    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)

    # Run fusion pipeline
    try:
        result = fuse_predictions(audio_path, video_path)
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/health")
def health_check():
    return {"status": "ok"}
