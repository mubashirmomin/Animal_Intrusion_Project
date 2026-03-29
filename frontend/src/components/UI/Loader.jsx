import React from 'react'

export default function Loader({ size = 20, label = 'Loading…' }) {
  return (
    <div style={styles.wrap}>
      <div
        style={{
          ...styles.spinner,
          width: size,
          height: size,
          borderWidth: size > 24 ? 2.5 : 2,
        }}
      />
      {label && <span style={styles.label}>{label}</span>}
    </div>
  )
}

const styles = {
  wrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: 'var(--text-2)',
    fontSize: 13,
  },
  spinner: {
    borderRadius: '50%',
    border: '2px solid var(--bg-4)',
    borderTopColor: 'var(--accent)',
    animation: 'spin 0.75s linear infinite',
    flexShrink: 0,
  },
  label: {
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.02em',
  },
}
