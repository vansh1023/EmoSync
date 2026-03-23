import React, { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils.js";
import "../style/faceExpression.scss";

export default function MoodDetector() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState("Detecting...");

  useEffect(() => {
    init({ faceLandmarkerRef });
  }, []);

  return (
    <main>
      <div className="expression-body">
        <h2>Real-Time Mood Detection</h2>

        <div className="video-wrapper">
          <video ref={videoRef} style={{ display: "none" }} playsInline />
        </div>

        {mood && <h3>Detected Mood: {mood}</h3>}

        <button
          onClick={() => {
            detect({ faceLandmarkerRef, videoRef, setLoading, setMood });
          }}
        >
          {" "}
          {loading ? "Detecting..." : "Detect Expression"}{" "}
        </button>
      </div>
    </main>
  );
}
