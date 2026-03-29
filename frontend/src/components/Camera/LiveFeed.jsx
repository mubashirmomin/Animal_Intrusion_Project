import React from 'react'
import { Camera, Wifi } from 'lucide-react'

/**
 * LiveFeed — future Raspberry Pi camera integration.
 * This component is a placeholder. When the Pi is ready:
 * 1. Replace STREAM_URL with your Pi's MJPEG or WebRTC stream endpoint.
 * 2. Set up polling or a WebSocket to push frames to /api/detection automatically.
 */

const STREAM_URL = null  // e.g. 'http://192.168.1.x:8080/stream.mjpg'

export default function LiveFeed() {
  if (STREAM_URL) {
    return (
      <div style={s.wrap}>
        <div style={s.header}>
          <div style={s.liveDot} />
          <span style={s.liveLabel}>LIVE</span>
          <span style={s.camLabel}>Camera 01 · Raspberry Pi</span>
        </div>
        <img
          src={STREAM_URL}
          alt="Live camera feed"
          style={s.stream}
        />
      </div>
    )
  }

  return (
    <div style={s.placeholder}>
      <div style={s.iconWrap}>
        <Camera size={28} color="var(--text-3)" strokeWidth={1.5} />
      </div>
      <p style={s.title}>Live feed — not yet connected</p>
      <p style={s.sub}>
        Raspberry Pi integration is pending.<br />
        Set <code style={s.code}>STREAM_URL</code> in <code style={s.code}>LiveFeed.jsx</code> to activate.
      </p>
      <div style={s.hint}>
        <Wifi size={12} color="var(--text-3)" />
        <span>Expected: MJPEG stream over local network</span>
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
