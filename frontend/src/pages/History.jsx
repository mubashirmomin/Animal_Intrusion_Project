import React, { useEffect } from 'react'
import { useHistory } from '../hooks/useDetection.js'
import DetectionTable from '../components/Detection/DetectionTable.jsx'
import { Clock, RefreshCw } from 'lucide-react'

export default function History() {
  const { records, loading, error, fetchHistory } = useHistory()

  useEffect(() => { fetchHistory() }, [fetchHistory])

  return (
    <main style={s.main}>
      <div style={s.hdr}>
        <div>
          <h1 style={s.title}>Detection History</h1>
          <p style={s.sub}>
            All animal intrusion records from MySQL · {records.length} total
          </p>
        </div>
        <button style={s.refreshBtn} onClick={fetchHistory} disabled={loading}>
          <RefreshCw
            size={13}
            style={loading ? { animation: 'spin 0.75s linear infinite' } : {}}
          />
          Refresh
        </button>
      </div>

      <DetectionTable records={records} loading={loading} error={error} />
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
  hdr: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 28,
    flexWrap: 'wrap',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: '-0.01em',
    marginBottom: 6,
  },
  sub: {
    fontSize: 14,
    color: 'var(--text-2)',
  },
  refreshBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '7px 14px',
    background: 'var(--bg-3)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-2)',
    fontSize: 12,
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    flexShrink: 0,
  },
}
