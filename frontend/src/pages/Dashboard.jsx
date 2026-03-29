import React, { useEffect, useMemo } from 'react'
import { useHistory } from '../hooks/useDetection.js'
import Loader from '../components/UI/Loader.jsx'
import { formatDate } from '../utils/formatDate.js'
import { RefreshCw, ShieldAlert, TrendingUp, Bell, Activity } from 'lucide-react'

const ICONS = { Elephant: '🐘', Leopard: '🐆', 'Wild Boar': '🐗' }

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={s.statCard}>
      <p style={s.statLabel}>{label}</p>
      <p style={{ ...s.statValue, ...(accent ? { color: accent } : {}) }}>{value}</p>
      {sub && <p style={s.statSub}>{sub}</p>}
    </div>
  )
}

function BarChart({ records }) {
  const counts = useMemo(() => {
    const c = { Elephant: 0, Leopard: 0, 'Wild Boar': 0 }
    records.forEach(r => { if (c[r.animalType] !== undefined) c[r.animalType]++ })
    return c
  }, [records])

  const max = Math.max(...Object.values(counts), 1)
  const colors = { Elephant: 'var(--green)', Leopard: 'var(--red)', 'Wild Boar': 'var(--amber)' }

  return (
    <div style={s.barChart}>
      {Object.entries(counts).map(([animal, count]) => (
        <div key={animal} style={s.barRow}>
          <span style={s.barAnimal}>{ICONS[animal]} {animal}</span>
          <div style={s.barTrack}>
            <div style={{
              ...s.barFill,
              width: `${(count / max) * 100}%`,
              background: colors[animal],
              transition: 'width 0.6s ease',
            }} />
          </div>
          <span style={{ ...s.barCount, color: colors[animal] }}>{count}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { records, loading, error, fetchHistory } = useHistory()

  useEffect(() => { fetchHistory() }, [fetchHistory])

  const stats = useMemo(() => {
    const total = records.length
    const today = records.filter(r => {
      const d = new Date(r.detectedAt)
      const now = new Date()
      return d.toDateString() === now.toDateString()
    }).length
    const alerts = records.filter(r => r.alertSent !== false).length
    const counts = {}
    records.forEach(r => { counts[r.animalType] = (counts[r.animalType] || 0) + 1 })
    const topAnimal = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
    const avgConf = total ? (records.reduce((sum, r) => sum + Number(r.confidence || 0), 0) / total * 100).toFixed(1) : '—'
    return { total, today, alerts, topAnimal, avgConf }
  }, [records])

  const recent5 = useMemo(() =>
    [...records].sort((a, b) => new Date(b.detectedAt) - new Date(a.detectedAt)).slice(0, 5),
    [records]
  )

  return (
    <main style={s.main}>
      <div style={s.hdr}>
        <div>
          <h1 style={s.title}>Dashboard</h1>
          <p style={s.sub}>Live overview of all animal intrusion detections</p>
        </div>
        <button style={s.refreshBtn} onClick={fetchHistory} disabled={loading}>
          <RefreshCw size={13} style={loading ? { animation: 'spin 0.75s linear infinite' } : {}} />
          Refresh
        </button>
      </div>

      {loading && <div style={{ padding: '40px 0' }}><Loader size={22} label="Fetching data from backend…" /></div>}

      {error && <div style={s.errorBox}>{error}</div>}

      {!loading && (
        <>
          {/* Stat cards */}
          <div style={s.statRow}>
            <StatCard label="Total detections" value={stats.total} sub="All time" />
            <StatCard label="Today" value={stats.today} sub={new Date().toLocaleDateString('en-IN', { weekday: 'long' })} accent="var(--accent)" />
            <StatCard label="Alerts sent" value={stats.alerts} sub="via Telegram" />
            <StatCard
              label="Most detected"
              value={stats.topAnimal ? `${ICONS[stats.topAnimal[0]]} ${stats.topAnimal[0]}` : '—'}
              sub={stats.topAnimal ? `${stats.topAnimal[1]} times` : ''}
            />
            <StatCard label="Avg confidence" value={stats.avgConf !== '—' ? `${stats.avgConf}%` : '—'} sub="Model accuracy" />
          </div>

          {/* Charts + recent */}
          <div style={s.panels}>
            <div style={s.panel}>
              <div style={s.panelHdr}>
                <TrendingUp size={14} color="var(--text-2)" />
                <span style={s.panelTitle}>Animal breakdown</span>
              </div>
              <BarChart records={records} />
            </div>

            <div style={s.panel}>
              <div style={s.panelHdr}>
                <Activity size={14} color="var(--text-2)" />
                <span style={s.panelTitle}>Recent detections</span>
              </div>
              {recent5.length === 0 && (
                <p style={s.empty}>No records yet</p>
              )}
              {recent5.map((r, i) => (
                <div key={r.id ?? i} style={s.recentRow}>
                  <span style={{ fontSize: 18 }}>{ICONS[r.animalType] || '🦎'}</span>
                  <div style={{ flex: 1 }}>
                    <p style={s.recentAnimal}>{r.animalType}</p>
                    <p style={s.recentTime}>{formatDate(r.detectedAt)}</p>
                  </div>
                  <span style={s.recentConf}>
                    {Math.round(Number(r.confidence) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  )
}

const s = {
  main: { maxWidth: 1100, margin: '0 auto', padding: '40px 20px 60px', animation: 'fadeIn 0.3s ease' },
  hdr: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 32, flexWrap: 'wrap' },
  title: { fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 6 },
  sub: { fontSize: 14, color: 'var(--text-2)' },
  refreshBtn: {
    display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
    background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
    color: 'var(--text-2)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)',
  },
  statRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 },
  statCard: { background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 18px' },
  statLabel: { fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', marginBottom: 8, textTransform: 'uppercase' },
  statValue: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 },
  statSub: { fontSize: 11, color: 'var(--text-3)' },
  panels: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 },
  panel: { background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 },
  panelHdr: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 },
  panelTitle: { fontSize: 13, fontWeight: 500, color: 'var(--text-1)', fontFamily: 'var(--font-display)' },
  barChart: { display: 'flex', flexDirection: 'column', gap: 16 },
  barRow: { display: 'flex', alignItems: 'center', gap: 10 },
  barAnimal: { fontSize: 13, color: 'var(--text-2)', width: 110, flexShrink: 0 },
  barTrack: { flex: 1, height: 6, background: 'var(--bg-4)', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 3, minWidth: 4 },
  barCount: { fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, width: 24, textAlign: 'right' },
  recentRow: { display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid var(--border)' },
  recentAnimal: { fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--text-1)' },
  recentTime: { fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginTop: 2 },
  recentConf: { fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--green)' },
  empty: { fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', textAlign: 'center', padding: '24px 0' },
  errorBox: { padding: '12px 16px', background: 'var(--red-bg)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 'var(--radius-sm)', color: 'var(--red)', fontSize: 12, fontFamily: 'var(--font-mono)', marginBottom: 24 },
}
