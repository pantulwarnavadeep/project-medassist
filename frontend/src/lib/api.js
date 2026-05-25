import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8000/api' })

export const createPrescription = (data) => api.post('/prescriptions', data)
export const getPatientPrescriptions = (id) => api.get(`/prescriptions/patient/${id}`)
export const sendChatMessage = (patient_id, question) =>
  api.post('/chat', { patient_id, question })

export default api
