import React, { useState, useMemo } from 'react'
import DetectionRow from './DetectionRow.jsx'
import Loader from '../UI/Loader.jsx'
import { Filter } from 'lucide-react'

const ANIMALS = ['All', 'Elephant', 'Leopard', 'Wild Boar']

export default function DetectionTable({ records = [], loading, error }) {
  const [filter, setFilter] = useState('All')
  const [sortDir, setSortDir] = useState('desc')

  const filtered = useMemo(() => {
    let list = filter === 'All' ? records : records.filter(r => r.animalType === filter)
    list = [...list].sort((a, b) => {
      const diff = new Date(a.detectedAt) - new Date(b.detectedAt)
      return sortDir === 'desc' ? -diff : diff
    })
    return list
  }, [records, filter, sortDir])

  return (
    <div style={s.wrap}>
      {/* Toolbar */}
      <div style={s.toolbar}>
        <div style={s.filterGroup}>
          <Filter size={13} color="var(--text-3)" />
          {ANIMALS.map(a => (
            <button
              key={a}
              style={{ ...s.filterBtn, ...(filter === a ? s.filterBtnActive : {}) }}
              onClick={() => setFilter(a)}
            >
              {a}
            </button>
          ))}
        </div>
        <button
          style={s.sortBtn}
          onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
        >
          {sortDir === 'desc' ? '↓ Newest' : '↑ Oldest'}
        </button>
      </div>

      {/* Table */}
      {loading && (
        <div style={s.center}>
          <Loader size={20} label="Loading records…" />
        </div>
      )}

      {error && (
        <div style={s.errorBox}>{error}</div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div style={s.center}>
          <p style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
            No detection records found.
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr style={s.thead}>
                <th style={s.th}>Animal</th>
                <th style={s.th}>Confidence</th>
                <th style={s.th}>Detected at</th>
                <th style={s.th}>Image file</th>
                <th style={s.th}>Alert</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <DetectionRow key={r.id ?? i} record={r} index={i} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div style={s.footer}>
          {filtered.length} record{filtered.length !== 1 ? 's' : ''}
          {filter !== 'All' && ` · filtered by ${filter}`}
        </div>
      )}
    </div>
  )
}

const s = {
  wrap: {
    background: 'var(--bg-1)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 16px',
    borderBottom: '1px solid var(--border)',
    gap: 12,
    flexWrap: 'wrap',
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  filterBtn: {
    padding: '4px 12px',
    borderRadius: 20,
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text-2)',
    fontSize: 12,
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.15s',
  },
  filterBtnActive: {
    background: 'var(--bg-4)',
    color: 'var(--text-1)',
    borderColor: 'var(--border-strong)',
  },
  sortBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-3)',
    fontSize: 11,
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    padding: '4px 6px',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: 600,
  },
  thead: {
    background: 'var(--bg-2)',
  },
  th: {
    padding: '10px 16px',
    textAlign: 'left',
    fontSize: 11,
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-3)',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    borderBottom: '1px solid var(--border)',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
  },
  errorBox: {
    margin: 16,
    padding: '12px 16px',
    background: 'var(--red-bg)',
    border: '1px solid rgba(248,113,113,0.2)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--red)',
    fontSize: 12,
    fontFamily: 'var(--font-mono)',
  },
  footer: {
    padding: '10px 16px',
    fontSize: 11,
    color: 'var(--text-3)',
    fontFamily: 'var(--font-mono)',
    borderTop: '1px solid var(--border)',
  },
}
