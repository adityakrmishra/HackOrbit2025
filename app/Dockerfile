# Dockerfile

# Base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Avoid Python buffering issues
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/app.py ./app/app.py
COPY fuse.py predict_audio.py predict_video.py ./
COPY utils/ ./utils/
COPY models/ ./models/

# Expose API port
EXPOSE 8000

# Run the FastAPI server
CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "8000"]
