import React from 'react'
import { CheckCircle2, XCircle, Send } from 'lucide-react'
import { formatConfidence } from '../../utils/formatDate.js'

const ANIMAL_META = {
  Elephant:  { icon: '🐘', color: 'var(--green)',  bg: 'var(--green-bg)',  label: 'High danger' },
  Leopard:   { icon: '🐆', color: 'var(--red)',    bg: 'var(--red-bg)',    label: 'Extreme danger' },
  'Wild Boar': { icon: '🐗', color: 'var(--amber)', bg: 'var(--amber-bg)', label: 'Moderate danger' },
}

function ConfBar({ value }) {
  const pct = Math.round((value || 0) * 100)
  const color = pct >= 80 ? 'var(--green)' : pct >= 60 ? 'var(--amber)' : 'var(--red)'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>Confidence</span>
        <span style={{ fontSize: 13, fontWeight: 500, color, fontFamily: 'var(--font-mono)' }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: 'var(--bg-4)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  )
}

export default function ResultCard({ result, error }) {
  if (error) {
    return (
      <div style={{ ...s.card, borderColor: 'rgba(248,113,113,0.25)', background: 'var(--red-bg)' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <XCircle size={18} color="var(--red)" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <p style={{ color: 'var(--red)', fontWeight: 500, marginBottom: 4 }}>Detection failed</p>
            <p style={{ color: 'var(--text-2)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!result) return null

  const { animal, confidence, detected } = result
  const meta = ANIMAL_META[animal] || { icon: '🦎', color: 'var(--text-2)', bg: 'var(--bg-3)', label: 'Unknown' }

  if (!detected) {
    return (
      <div style={s.card}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <CheckCircle2 size={20} color="var(--green)" />
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>No intrusion detected</p>
            <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 3 }}>Area appears clear. No alert was sent.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ ...s.card, borderColor: meta.color + '33', animation: 'fadeIn 0.3s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={{ ...s.animalIcon, background: meta.bg }}>
          <span style={{ fontSize: 28 }}>{meta.icon}</span>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-1)' }}>
            {animal}
          </p>
          <span style={{ ...s.dangerTag, color: meta.color, background: meta.bg }}>
            {meta.label}
          </span>
        </div>
        <div style={s.detectedBadge}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', display: 'block' }} />
          DETECTED
        </div>
      </div>

      <ConfBar value={confidence} />

      {/* Alert notice */}
      <div style={s.alertNotice}>
        <Send size={12} color="var(--accent)" />
        <span>Telegram alert dispatched · Record saved to database</span>
      </div>

      {/* Raw JSON */}
      <details style={s.details}>
        <summary style={s.summary}>Raw API response</summary>
        <pre style={s.pre}>{JSON.stringify(result, null, 2)}</pre>
      </details>
    </div>
  )
}

const s = {
  card: {
    background: 'var(--bg-2)',
    border: '1px solid var(--border-strong)',
    borderRadius: 'var(--radius)',
    padding: '20px',
  },
  animalIcon: {
    width: 60,
    height: 60,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  dangerTag: {
    display: 'inline-block',
    fontSize: 10,
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    padding: '2px 8px',
    borderRadius: 4,
    marginTop: 4,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  detectedBadge: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'var(--red)',
    letterSpacing: '0.08em',
    background: 'var(--red-bg)',
    padding: '4px 10px',
    borderRadius: 4,
    flexShrink: 0,
  },
  alertNotice: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    marginTop: 14,
    padding: '8px 12px',
    background: 'var(--accent-dim)',
    borderRadius: 6,
    fontSize: 11,
    color: 'var(--accent)',
    fontFamily: 'var(--font-mono)',
  },
  details: { marginTop: 14 },
  summary: {
    fontSize: 11,
    color: 'var(--text-3)',
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    userSelect: 'none',
  },
  pre: {
    marginTop: 8,
    padding: 12,
    background: 'var(--bg-0)',
    borderRadius: 6,
    fontSize: 11,
    color: 'var(--text-2)',
    fontFamily: 'var(--font-mono)',
    overflowX: 'auto',
    lineHeight: 1.7,
  },
}
