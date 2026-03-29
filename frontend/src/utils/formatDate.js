/**
 * Formats an ISO datetime string into a readable local time.
 * e.g. "2024-03-22T18:45:00" → "Mar 22, 2024 · 6:45 PM"
 */
export function formatDate(isoString) {
  if (!isoString) return '—'
  const d = new Date(isoString)
  if (isNaN(d)) return isoString

  const datePart = d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  const timePart = d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  return `${datePart} · ${timePart}`
}

/**
 * Returns a relative label like "Today", "Yesterday", or the date.
 */
export function relativeDay(isoString) {
  if (!isoString) return '—'
  const d = new Date(isoString)
  const now = new Date()
  const diffDays = Math.floor((now - d) / 86400000)
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

/**
 * Formats confidence (0–1) as a percentage string.
 */
export function formatConfidence(value) {
  if (value == null) return '—'
  return `${Math.round(Number(value) * 100)}%`
}
