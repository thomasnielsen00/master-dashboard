"use client";

import React, { useRef, useEffect, useState } from "react";

export default function WebcamFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startVideo = async () => {
      if (!videoRef.current) return;

      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = newStream;
        setStream(newStream);
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    startVideo();

    return () => {
      stopVideo(); // Clean up when component unmounts
    };
  }, []);

  const stopVideo = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div>
      <h2>Live Webcam Feed</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          margin: "auto",
          width: "800px",
          border: "2px solid black",
        }}
      />
      <br />
      <button
        onClick={stopVideo}
        disabled={!stream}
        style={{
          backgroundColor: "purple",
          color: "white",
          padding: "1rem",
          borderRadius: 12,
          margin: "2rem",
        }}
      >
        Stop Video
      </button>
    </div>
  );
}
