import {
  FaceLandmarker,
  FilesetResolver
} from "@mediapipe/tasks-vision";



export const init = async ({ faceLandmarkerRef }) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
  );

  faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    runningMode: "VIDEO",
    outputFaceBlendshapes: true,
    numFaces: 1,
  });

};




// 🎥 Start Camera
const startCamera = async ({ videoRef }) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  videoRef.current.srcObject = stream;
  await videoRef.current.play();

  return stream;

};





// 🎯 Emotion Logic
const detectMood = (blendshapes) => {
  const getScore = (name) =>
    blendshapes.find((b) => b.categoryName === name)?.score || 0;


  const smile = (getScore("mouthSmileLeft") + getScore("mouthSmileRight")) / 2;
  const mouthOpen = getScore("jawOpen");
  const browUp = getScore("browInnerUp");
  const eyeBlink = (getScore("eyeBlinkLeft") + getScore("eyeBlinkRight")) / 2;
  // const cheekRaise = getScore("cheekPuff");
  const mouthFrownLeft = getScore("mouthFrownLeft");
  const mouthFrownRight = getScore("mouthFrownRight");



  // 🔥 Improved (more sensitive)
  if (smile > 0.5) return "😊 Happy";
  if (mouthOpen > 0.15 && browUp > 0.05) return "😲 Surprised";
  if (eyeBlink > 0.4) return "😑 Sleepy";
  if (mouthFrownLeft > 0.001 && mouthFrownRight > 0.001) return "😟 sad";
  if (smile < 0.15 && mouthOpen < 0.2) return "😐 Neutral";

  return "🤔 Thinking";
};






// 🔁 Detection Loop
export const detect = async ({ faceLandmarkerRef, videoRef, setLoading, setMood }) => {

    setLoading(true);
    const stream = await startCamera({ videoRef });

    const video = videoRef.current;

    await new Promise((res) => setTimeout(res, 500));


    if (!faceLandmarkerRef.current) {
      setMood("Model not loaded");
      setLoading(false);
      return;
    }

    if (!video || video.readyState < 2) {
      setMood("Camera not ready");
      setLoading(false);
      return;
    }

    const results = faceLandmarkerRef.current.detectForVideo(video, performance.now());

      if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;

        console.log(blendshapes)

        const detectedMood = detectMood(blendshapes);

        // ✅ Force update only if changed
        // setMood((prev) => (prev !== detectedMood ? detectedMood : prev));
        setMood(detectedMood);
      }

      stream.getTracks().forEach((track) => track.stop());

      setLoading(false);


};

