import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

/**
 * POST /api/detection
 * Sends an image file for animal detection.
 * @param {File} imageFile
 * @returns {Promise<{ animal: string, confidence: number, detected: boolean }>}
 */
export async function detectAnimal(imageFile) {
  const formData = new FormData()
  formData.append('file', imageFile)

  const response = await api.post('/api/detection', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

/**
 * GET /api/detection/history
 * Fetches all past detection records from the DB.
 * @returns {Promise<Array<{ id, animalType, confidence, imagePath, detectedAt }>>}
 */
export async function getDetectionHistory() {
  const response = await api.get('/api/detection/history')
  return response.data
}

/**
 * GET /api/detection/history?animal={type}
 * Fetches detection records filtered by animal type.
 * @param {string} animalType
 */
export async function getDetectionsByAnimal(animalType) {
  const response = await api.get('/api/detection/history', {
    params: { animal: animalType }
  })
  return response.data
}

export default api
