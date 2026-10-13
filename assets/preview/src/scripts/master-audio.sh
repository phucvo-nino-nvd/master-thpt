#!/usr/bin/env bash
set -euo pipefail
# Run score.py first (Python + NumPy). Gain measured for this exact deterministic score.
project_dir="$(cd "$(dirname "$0")/.." && pwd)"
ffmpeg -y -i "$project_dir/public/soundtrack-raw.wav" -af volume=-0.56dB -ar 48000 "$project_dir/public/soundtrack.wav"
ffmpeg -i "$project_dir/public/soundtrack.wav" -af loudnorm=I=-14:TP=-1.5:LRA=9:print_format=json -f null -
