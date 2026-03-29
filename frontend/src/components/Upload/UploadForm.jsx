import React, { useRef, useState, useCallback } from 'react'
import { UploadCloud, Image } from 'lucide-react'
import Loader from '../UI/Loader.jsx'

export default function UploadForm({ onSubmit, loading }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)

  const handleFile = useCallback((f) => {
    if (!f || !f.type.startsWith('image/')) return
    setFile(f)
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target.result)
    reader.readAsDataURL(f)
  }, [])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    handleFile(f)
  }, [handleFile])

  const onInputChange = (e) => handleFile(e.target.files[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (file && !loading) onSubmit(file)
  }

  const clear = () => {
    setFile(null)
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit} style={s.form}>
      {/* Drop zone */}
      <div
        style={{
          ...s.dropZone,
          ...(dragOver ? s.dropZoneActive : {}),
          ...(preview ? s.dropZoneHasFile : {}),
        }}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !preview && inputRef.current?.click()}
      >
        {preview ? (
          <div style={s.previewWrap}>
            <img src={preview} alt="Preview" style={s.previewImg} />
            <button type="button" style={s.clearBtn} onClick={(e) => { e.stopPropagation(); clear() }}>
              ✕ Remove
            </button>
          </div>
        ) : (
          <div style={s.placeholder}>
            <div style={s.uploadIcon}>
              <UploadCloud size={28} color="var(--accent)" strokeWidth={1.5} />
            </div>
            <p style={s.uploadTitle}>Drop image here</p>
            <p style={s.uploadSub}>or click to browse · JPG, PNG, WEBP</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onInputChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Filename label */}
      {file && (
        <div style={s.fileLabel}>
          <Image size={12} color="var(--accent)" />
          <span>{file.name}</span>
          <span style={s.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!file || loading}
        style={{ ...s.btn, ...(!file || loading ? s.btnDisabled : {}) }}
      >
        {loading
          ? <Loader size={16} label="Analyzing…" />
          : (
            <>
              <span style={s.btnIcon}>⬡</span>
              Run Detection
            </>
          )
        }
      </button>
    </form>
  )
}

const s = {
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  dropZone: {
    border: '1.5px dashed var(--border-strong)',
    borderRadius: 'var(--radius)',
    minHeight: 220,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background 0.2s',
    background: 'var(--bg-2)',
    overflow: 'hidden',
  },
  dropZoneActive: {
    borderColor: 'var(--accent)',
    background: 'var(--accent-dim)',
  },
  dropZoneHasFile: {
    cursor: 'default',
    borderStyle: 'solid',
    borderColor: 'var(--border-strong)',
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    padding: 32,
    userSelect: 'none',
  },
  uploadIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    background: 'var(--accent-dim)',
    border: '1px solid rgba(34,211,238,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 16,
    color: 'var(--text-1)',
    fontWeight: 600,
  },
  uploadSub: {
    fontSize: 12,
    color: 'var(--text-3)',
    fontFamily: 'var(--font-mono)',
  },
  previewWrap: {
    width: '100%',
    position: 'relative',
  },
  previewImg: {
    width: '100%',
    maxHeight: 340,
    objectFit: 'cover',
    display: 'block',
  },
  clearBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'rgba(10,11,13,0.8)',
    border: '1px solid var(--border-strong)',
    borderRadius: 20,
    color: 'var(--text-2)',
    fontSize: 11,
    padding: '4px 10px',
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
  },
  fileLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text-2)',
  },
  fileSize: {
    color: 'var(--text-3)',
    marginLeft: 'auto',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '12px 24px',
    background: 'var(--accent)',
    color: '#0a0b0d',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: '0.03em',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
  btnDisabled: {
    opacity: 0.35,
    cursor: 'not-allowed',
  },
  btnIcon: { fontSize: 16 },
}
