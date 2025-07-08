import streamlit as st
import requests
import os

st.set_page_config(page_title="🎭 Deepfake Detector Dashboard", layout="centered")
st.title("🔍 Real-Time Deepfake Detection")
st.markdown("""
Upload an audio + video pair (same context) to check for signs of deepfaking. 
The model analyzes both modalities and gives you a confidence score.
""")

API_ENDPOINT = "http://localhost:8000/analyze"

# Upload files
audio_file = st.file_uploader("🎙️ Upload Audio File", type=["wav", "mp3", "m4a"])
video_file = st.file_uploader("📹 Upload Video File", type=["mp4", "avi", "mov"])

if st.button("🚀 Analyze"):
    if not audio_file or not video_file:
        st.warning("Please upload both audio and video files.")
    else:
        with st.spinner("Analyzing for deepfakes..."):
            files = {
                "audio": (audio_file.name, audio_file, audio_file.type),
                "video": (video_file.name, video_file, video_file.type)
            }
            try:
                response = requests.post(API_ENDPOINT, files=files)
                if response.status_code == 200:
                    result = response.json()
                    st.success("✅ Analysis Complete!")
                    st.metric("Audio Score", f"{result['audio_score']*100:.2f}%")
                    st.metric("Video Score", f"{result['video_score']*100:.2f}%")
                    st.metric("Fused Deepfake Probability", f"{result['fused_score']*100:.2f}%")
                    st.progress(result['fused_score'])
                else:
                    st.error(f"❌ Error from server: {response.json().get('error')}")
            except Exception as e:
                st.error(f"🚨 Failed to connect to API: {e}")

st.markdown("---")
st.caption("Built for HackOrbit 2025 — AI/ML Track • Multilingual Deepfake Detection")
