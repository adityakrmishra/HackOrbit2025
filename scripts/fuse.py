from predict_audio import predict_audio
from predict_video import predict_video
import json

def fuse_predictions(audio_path, video_path):
    print("🔍 Running audio prediction...")
    audio_score = predict_audio(audio_path)

    print("🎞️ Running video prediction...")
    video_score = predict_video(video_path)

    fused_score = 0.4 * audio_score + 0.6 * video_score

    result = {
        "audio_score": round(audio_score, 3),
        "video_score": round(video_score, 3),
        "fused_score": round(fused_score, 3)
    }

    with open("fused_output.json", "w") as f:
        json.dump(result, f, indent=2)

    print("✅ Fused result saved to fused_output.json")
    return result

if __name__ == "__main__":
    fuse_predictions("sample_audio.wav", "sample_video.mp4")
