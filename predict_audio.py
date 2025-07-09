import torch
import numpy as np
import random

def predict_audio(audio_path):
    """
    Simulate audio deepfake prediction
    Returns a score between 0 and 1
    """
    # Simulate processing time and realistic scoring
    print(f"Processing audio file: {audio_path}")
    
    # Generate realistic mock score (most content is real, some suspicious)
    random_val = random.random()
    if random_val < 0.7:
        # 70% chance of low score (likely real)
        score = random.uniform(0.05, 0.25)
    elif random_val < 0.9:
        # 20% chance of medium score
        score = random.uniform(0.25, 0.65)
    else:
        # 10% chance of high score (likely fake)
        score = random.uniform(0.65, 0.95)
    
    return score

if __name__ == "__main__":
    result = predict_audio("sample_audio.wav")
    print(f"Audio deepfake probability: {result:.3f}")