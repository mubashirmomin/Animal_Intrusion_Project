


import React, { useEffect, useRef, useState } from 'react'
import { Camera, Wifi } from 'lucide-react'
import axios from 'axios'

const STREAM_URL = null

export default function LiveFeed() {

  console.log("LiveFeed mounted");
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [cameraOn, setCameraOn] = useState(false)
  const isProcessingRef = useRef(false); // 🔒 prevents multiple triggers
  const lastCaptureTimeRef = useRef(0);

  // 🔥 Poll motion
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/motion/status")

        const now = Date.now();

      if (
          res.data === true &&
          !isProcessingRef.current &&
          now - lastCaptureTimeRef.current > 5000 // ⏱️ 5 sec cooldown
        ){
          console.log("🚨 Motion detected");

          isProcessingRef.current = true;
          lastCaptureTimeRef.current = now;

          startCamera();
         }
        
      } catch (err) {
        console.error(err)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [cameraOn])

 const startCamera = async () => {
  setCameraOn(true); // 🔥 FIRST render video

  setTimeout(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }

      setTimeout(captureImage, 2000);

    } catch (err) {
      console.error("Camera error:", err);
    }
  }, 300); // 🔥 small delay for DOM render
};

  const captureImage = () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (!video || !canvas) return; // 🔥 prevent crash

  if (!video.videoWidth) return; // 🔥 wait until video ready

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  canvas.toBlob(async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "capture.jpg");

    await axios.post("http://localhost:8080/api/detection", formData);

    console.log("📸 Image sent");

    stopCamera();

    await axios.post("http://localhost:8080/api/motion/reset");
    isProcessingRef.current = false; // 🔓 UNLOCK
  }, "image/jpeg");
};

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    setCameraOn(false)
  }

  // 🔥 If camera active → show video instead of placeholder
  if (cameraOn) {
    return (
      <div style={s.wrap}>
        <div style={s.header}>
          <div style={s.liveDot} />
          <span style={s.liveLabel}>LIVE</span>
          <span style={s.camLabel}>Camera Active</span>
        </div>

        <video
          ref={videoRef}
          autoPlay
          style={s.stream}
        />

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    )
  }

  // 🔥 Existing UI (unchanged)
  return (
    <div style={s.placeholder}>
      <div style={s.iconWrap}>
        <Camera size={28} color="var(--text-3)" strokeWidth={1.5} />
      </div>
      <p style={s.title}>Live feed — not yet connected</p>
      <p style={s.sub}>
        Motion-triggered camera system ready.<br />
        Waiting for motion detection...
      </p>
      <div style={s.hint}>
        <Wifi size={12} color="var(--text-3)" />
        <span>ESP32 + PIR will trigger camera</span>
      </div>
    </div>
  )
}

const s = {
  wrap: {
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    border: '1px solid var(--border)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 14px',
    background: 'var(--bg-2)',
    borderBottom: '1px solid var(--border)',
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: 'var(--red)',
    animation: 'pulse-dot 1.2s ease-in-out infinite',
  },
  liveLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'var(--red)',
    fontWeight: 500,
    letterSpacing: '0.08em',
  },
  camLabel: {
    fontSize: 12,
    color: 'var(--text-3)',
    fontFamily: 'var(--font-mono)',
    marginLeft: 4,
  },
  stream: {
    width: '100%',
    display: 'block',
    maxHeight: 400,
    objectFit: 'cover',
    background: '#000',
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    padding: '36px 24px',
    background: 'var(--bg-2)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    textAlign: 'center',
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 13,
    background: 'var(--bg-3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--text-1)',
  },
  sub: {
    fontSize: 12,
    color: 'var(--text-3)',
    lineHeight: 1.7,
  },
  code: {
    fontFamily: 'var(--font-mono)',
    background: 'var(--bg-4)',
    padding: '1px 5px',
    borderRadius: 4,
    color: 'var(--accent)',
    fontSize: 11,
  },
  hint: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    fontSize: 11,
    color: 'var(--text-3)',
    fontFamily: 'var(--font-mono)',
  },
}