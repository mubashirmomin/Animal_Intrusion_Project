import React from 'react'
import { formatDate, formatConfidence } from '../../utils/formatDate.js'
import { Send } from 'lucide-react'

const ICONS = { Elephant: '🐘', Leopard: '🐆', 'Wild Boar': '🐗' }
const CONF_COLOR = (v) => {
  const p = Number(v) * 100
  if (p >= 80) return { color: 'var(--green)', bg: 'var(--green-bg)' }
  if (p >= 60) return { color: 'var(--amber)', bg: 'var(--amber-bg)' }
  return { color: 'var(--red)', bg: 'var(--red-bg)' }
}

export default function DetectionRow({ record, index }) {
  const { animalType, confidence, imagePath, detectedAt, alertSent } = record
  const { color, bg } = CONF_COLOR(confidence)
  const icon = ICONS[animalType] || '🦎'
  const delay = `${index * 40}ms`

  return (
    <tr style={{ ...s.row, animationDelay: delay }}>
      <td style={s.td}>
        <div style={s.animalCell}>
          <span style={{ fontSize: 18 }}>{icon}</span>
          <span style={s.animalName}>{animalType}</span>
        </div>
      </td>
      <td style={s.td}>
        <span style={{ ...s.confBadge, color, background: bg }}>
          {formatConfidence(confidence)}
        </span>
      </td>
      <td style={{ ...s.td, ...s.monoCell }}>
        {formatDate(detectedAt)}
      </td>
      <td style={s.td}>
        {imagePath
          ? <span style={s.imgPath} title={imagePath}>{imagePath.split('/').pop()}</span>
          : <span style={s.dash}>—</span>
        }
      </td>
      <td style={s.td}>
        {alertSent !== false
          ? (
            <span style={s.alertYes}>
              <Send size={10} />
              Sent
            </span>
          )
          : <span style={s.dash}>—</span>
        }
      </td>
    </tr>
  )
}

const s = {
  row: {
    borderBottom: '1px solid var(--border)',
    animation: 'fadeIn 0.25s ease both',
  },
  td: {
    padding: '12px 16px',
    verticalAlign: 'middle',
  },
  animalCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  animalName: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 14,
    color: 'var(--text-1)',
  },
  confBadge: {
    display: 'inline-block',
    padding: '3px 9px',
    borderRadius: 4,
    fontSize: 12,
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
  },
  monoCell: {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    color: 'var(--text-2)',
  },
  imgPath: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text-3)',
    maxWidth: 160,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  },
  alertYes: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 11,
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent)',
    background: 'var(--accent-dim)',
    padding: '2px 8px',
    borderRadius: 4,
  },
  dash: {
    color: 'var(--text-3)',
    fontSize: 13,
  },
}
