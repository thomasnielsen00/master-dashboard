"use client";

import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceDetection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Ensure models are in /public/models

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

      setLoading(false);
      startVideo();
    };

    loadModels();
  }, []);

  const startVideo = async () => {
    if (!videoRef.current) return;

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = newStream;
      setStream(newStream);

      videoRef.current.onloadedmetadata = () => {
        console.log("Video metadata loaded:", {
          width: videoRef.current?.videoWidth,
          height: videoRef.current?.videoHeight,
        });
        detectFaces();
      };
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const stopVideo = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const detectFaces = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const interval = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;

      // 🚨 Prevent errors by checking if the video has valid dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.warn(
          "Skipping detection: Video dimensions are not available yet."
        );
        return;
      }

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length > 0) {
        console.log("Detected Emotions:", detections[0].expressions);

        // If you want to get the most likely emotion:
        const emotions = detections[0].expressions;
        const highestEmotion = Object.keys(emotions).reduce((a, b) =>
          // @ts-ignore
          emotions[a] > emotions[b] ? a : b
        );

        console.log("Most Likely Emotion:", highestEmotion);
      }

      const canvas = canvasRef.current;
      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight,
      };

      faceapi.matchDimensions(canvas, displaySize);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }
    }, 500); // Lower frequency (500ms) to avoid excessive logs

    return () => clearInterval(interval);
  };

  return (
    <div>
      <h2>Face Detection</h2>
      {loading ? <p>Loading models...</p> : null}
      <div style={{ position: "relative", display: "inline-block" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{ border: "2px solid black" }}
        />
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      <br />
      <button onClick={stopVideo} disabled={!stream}>
        Stop Video
      </button>
    </div>
  );
}
