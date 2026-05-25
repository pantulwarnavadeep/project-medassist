import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    api.get('/patients').then(r => setPatients(r.data))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-medium mb-6">Doctor Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active patients', value: patients.length },
          { label: 'Compliance rate', value: '87%' },
          { label: 'Pending today', value: 5 },
          { label: 'Missed doses', value: 8 },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className="text-2xl font-medium">{s.value}</p>
          </div>
        ))}
      </div>
      {/* Patient table goes here — map over patients state */}
    </div>
  )
}
