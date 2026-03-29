import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ShieldAlert, LayoutDashboard, Clock, Menu, X } from 'lucide-react'

const LINKS = [
  { to: '/',          label: 'Detect',    Icon: ShieldAlert },
  { to: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/history',   label: 'History',   Icon: Clock },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header style={s.header}>
      <div style={s.inner}>
        {/* Logo */}
        <NavLink to="/" style={s.logo} onClick={() => setOpen(false)}>
          <div style={s.logoIcon}>
            <ShieldAlert size={15} color="var(--accent)" strokeWidth={2} />
          </div>
          <span style={s.logoText}>AIM</span>
          <span style={s.logoDot}>·</span>
          <span style={s.logoSub}>Intrusion Monitor</span>
        </NavLink>

        {/* Desktop nav */}
        <nav style={s.nav}>
          {LINKS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({ ...s.navLink, ...(isActive ? s.navLinkActive : {}) })}
            >
              <Icon size={14} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Status pill */}
        <div style={s.status}>
          <span style={s.dot} />
          <span style={s.statusLabel}>Backend: localhost:8080</span>
        </div>

        {/* Mobile toggle */}
        <button style={s.menuBtn} onClick={() => setOpen(o => !o)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={s.mobileMenu}>
          {LINKS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({ ...s.mobileLink, ...(isActive ? s.mobileLinkActive : {}) })}
              onClick={() => setOpen(false)}
            >
              <Icon size={16} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}

const s = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(10,11,13,0.92)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border)',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 20px',
    height: 56,
    display: 'flex',
    alignItems: 'center',
    gap: 32,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
    flexShrink: 0,
  },
  logoIcon: {
    width: 28,
    height: 28,
    borderRadius: 7,
    background: 'var(--accent-dim)',
    border: '1px solid rgba(34,211,238,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontSize: 15,
    fontWeight: 700,
    color: 'var(--text-1)',
    letterSpacing: '0.05em',
  },
  logoDot: {
    color: 'var(--text-3)',
    fontSize: 12,
  },
  logoSub: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text-3)',
    letterSpacing: '0.04em',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '5px 12px',
    borderRadius: 'var(--radius-sm)',
    textDecoration: 'none',
    color: 'var(--text-2)',
    fontSize: 13,
    fontWeight: 400,
    transition: 'color 0.15s, background 0.15s',
  },
  navLinkActive: {
    color: 'var(--text-1)',
    background: 'var(--bg-3)',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginLeft: 'auto',
    flexShrink: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--green)',
    animation: 'pulse-dot 2s ease-in-out infinite',
    display: 'block',
  },
  statusLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text-3)',
    display: 'none',
  },
  menuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--text-2)',
    padding: 4,
    marginLeft: 'auto',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 16px 16px',
    borderTop: '1px solid var(--border)',
    gap: 2,
  },
  mobileLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    borderRadius: 'var(--radius-sm)',
    textDecoration: 'none',
    color: 'var(--text-2)',
    fontSize: 14,
  },
  mobileLinkActive: {
    color: 'var(--text-1)',
    background: 'var(--bg-3)',
  },
}
