import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DoctorDashboard from './pages/DoctorDashboard'
import PatientPortal from './pages/PatientPortal'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/patient" element={<PatientPortal />} />
      </Routes>
    </BrowserRouter>
  )
}
