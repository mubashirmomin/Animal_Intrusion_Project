import { useState, useCallback } from 'react'
import { detectAnimal, getDetectionHistory } from '../services/api.js'

/**
 * useDetection hook
 * Handles image upload → detection, and history fetching.
 */
export function useDetection() {
  const [result, setResult]     = useState(null)   // AIDetectionResponse
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  const runDetection = useCallback(async (file) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await detectAnimal(file)
      setResult(data)
    } catch (err) {
      setError(err?.response?.data?.message || 'Detection failed. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return { result, loading, error, runDetection, reset }
}

/**
 * useHistory hook
 * Fetches and manages detection history records.
 */
export function useHistory() {
  const [records, setRecords]   = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  const fetchHistory = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getDetectionHistory()
      setRecords(data)
    } catch (err) {
      setError('Could not load history. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }, [])

  return { records, loading, error, fetchHistory }
}
