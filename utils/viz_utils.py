import matplotlib.pyplot as plt
import numpy as np

def plot_heatmap(score_sequence, output_path="heatmap.png"):
    plt.figure(figsize=(10, 1))
    plt.imshow([score_sequence], aspect="auto", cmap="Reds", interpolation="nearest")
    plt.colorbar(label="Deepfake Confidence")
    plt.xlabel("Frame Index")
    plt.yticks([])
    plt.tight_layout()
    plt.savefig(output_path)
    print(f"Saved heatmap to {output_path}")
