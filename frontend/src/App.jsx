import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DoctorDashboard from './pages/DoctorDashboard'
import Appointments from './pages/Appointments'
import PatientPortal from './pages/PatientPortal'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<Appointments />} />
        <Route path="/patient" element={<PatientPortal />} />
        <Route path="*" element={<Navigate to="/doctor" />} />
      </Routes>
    </BrowserRouter>
  )
}
