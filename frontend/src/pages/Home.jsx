import React from 'react'
import UploadForm from '../components/Upload/UploadForm.jsx'
import ResultCard from '../components/Upload/ResultCard.jsx'
import { useDetection } from '../hooks/useDetection.js'
import { ShieldAlert, Zap, Database } from 'lucide-react'

export default function Home() {
  const { result, loading, error, runDetection, reset } = useDetection()

  const handleSubmit = (file) => {
    reset()
    runDetection(file)
  }

  return (
    <main style={s.main}>
      {/* Page header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Animal Detection</h1>
          <p style={s.sub}>Upload an image — AI identifies elephants, leopards & wild boars instantly</p>
        </div>
        <div style={s.pills}>
          <span style={s.pill}><Zap size={10} /> Roboflow AI</span>
          <span style={s.pill}><Database size={10} /> MySQL</span>
        </div>
      </div>

      <div style={s.grid}>
        {/* Upload panel */}
        <section style={s.panel}>
          <p style={s.panelLabel}>01 / Upload image</p>
          <UploadForm onSubmit={handleSubmit} loading={loading} />
        </section>

        {/* Result panel */}
        <section style={s.panel}>
          <p style={s.panelLabel}>02 / Detection result</p>
          {!result && !error && !loading && (
            <div style={s.emptyResult}>
              <ShieldAlert size={32} color="var(--text-3)" strokeWidth={1} />
              <p style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 12, fontFamily: 'var(--font-mono)' }}>
                Awaiting image…
              </p>
            </div>
          )}
          <ResultCard result={result} error={error} />
        </section>
      </div>

      {/* How it works */}
      <div style={s.flow}>
        {[
          { step: '01', label: 'Upload', desc: 'Image sent to Spring Boot backend via POST /api/detection' },
          { step: '02', label: 'Detect',  desc: 'AIService calls Roboflow model — returns animal + confidence' },
          { step: '03', label: 'Alert',   desc: 'If detected: record saved to MySQL + Telegram alert sent' },
        ].map(({ step, label, desc }, i) => (
          <React.Fragment key={step}>
            <div style={s.flowStep}>
              <span style={s.flowNum}>{step}</span>
              <p style={s.flowLabel}>{label}</p>
              <p style={s.flowDesc}>{desc}</p>
            </div>
            {i < 2 && <div style={s.flowArrow}>→</div>}
          </React.Fragment>
        ))}
      </div>
    </main>
  )
}

const s = {
  main: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '40px 20px 60px',
    animation: 'fadeIn 0.3s ease',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 36,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 32,
    fontWeight: 700,
    color: 'var(--text-1)',
    letterSpacing: '-0.01em',
    marginBottom: 6,
  },
  sub: {
    fontSize: 14,
    color: 'var(--text-2)',
    maxWidth: 480,
  },
  pills: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    flexShrink: 0,
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '4px 10px',
    borderRadius: 20,
    background: 'var(--bg-3)',
    border: '1px solid var(--border)',
    fontSize: 11,
    color: 'var(--text-2)',
    fontFamily: 'var(--font-mono)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 20,
    marginBottom: 40,
  },
  panel: {
    background: 'var(--bg-1)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '20px',
  },
  panelLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'var(--text-3)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  emptyResult: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
    borderRadius: 'var(--radius-sm)',
    background: 'var(--bg-2)',
    border: '1px dashed var(--border)',
  },
  flow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    padding: '20px',
    background: 'var(--bg-1)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
  },
  flowStep: {
    flex: 1,
    minWidth: 150,
    padding: '0 8px',
  },
  flowNum: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'var(--accent)',
    letterSpacing: '0.1em',
    display: 'block',
    marginBottom: 4,
  },
  flowLabel: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 14,
    color: 'var(--text-1)',
    marginBottom: 4,
  },
  flowDesc: {
    fontSize: 12,
    color: 'var(--text-3)',
    lineHeight: 1.6,
  },
  flowArrow: {
    color: 'var(--text-3)',
    fontSize: 20,
    flexShrink: 0,
  },
}
