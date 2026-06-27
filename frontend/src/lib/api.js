import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
const api = axios.create({ baseURL })

export const createPrescription = (data) => api.post('/prescriptions', data)
export const getPatientPrescriptions = (id) => api.get(`/prescriptions/patient/${id}`)
export const sendChatMessage = (patient_id, question) =>
  api.post('/chat', { patient_id, question })

export default api
