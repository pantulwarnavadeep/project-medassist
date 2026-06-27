import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Users, Calendar, AlertCircle, Bell, Search, Menu, CheckCircle } from 'lucide-react'
import api from '../lib/api'

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    // Mocking api call for demo purposes if backend isn't connected
    api.get('/patients').then(r => setPatients(r.data)).catch(() => {
      setPatients([
        { id: 1, name: 'Alice Johnson', status: 'Compliant', lastVisit: '2023-10-12', condition: 'Hypertension' },
        { id: 2, name: 'Bob Smith', status: 'Missed Dose', lastVisit: '2023-10-10', condition: 'Diabetes' },
        { id: 3, name: 'Charlie Davis', status: 'Action Needed', lastVisit: '2023-09-28', condition: 'Asthma' },
        { id: 4, name: 'Diana Prince', status: 'Compliant', lastVisit: '2023-10-15', condition: 'Hyperthyroidism' },
      ])
    })
  }, [])

  const stats = [
    { label: 'Active Patients', value: patients.length > 0 ? patients.length : 124, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Compliance Rate', value: '87%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Appointments Today', value: 8, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Alerts', value: 3, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ]

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">+</div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">MedAssist</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/doctor" className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium transition-colors">
            <Activity size={20} />
            Dashboard
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
            <Users size={20} />
            Patients
          </Link>
          <Link to="/doctor/appointments" className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
            <Calendar size={20} />
            Appointments
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-500 hover:text-slate-700">
              <Menu size={24} />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search patients..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-700 to-blue-400 flex items-center justify-center text-white font-medium shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              Dr
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, Dr. Smith</h1>
              <p className="text-slate-500 mt-1">Here is your practice overview for today.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-500 p-6 shadow-lg text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-sky-100/70">Smart workflow</p>
                <h2 className="mt-4 text-2xl font-semibold">4 medication alerts ready</h2>
                <p className="mt-3 text-sm text-sky-100/90">AI-guided summaries highlight missed doses and follow-up actions so you can prioritize care quickly.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Patient insight</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">97% adherence trend</h2>
                <p className="mt-3 text-sm text-slate-500">Track patient compliance and see which cases need a timely intervention.</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {stats.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={22} strokeWidth={2.5} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">{s.label}</p>
                      <h3 className="text-3xl font-bold tracking-tight text-slate-900">{s.value}</h3>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Patient Table Area */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-white">
                <h2 className="text-lg font-bold text-slate-800">Recent Patients</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider">Patient Name</th>
                      <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider">Condition</th>
                      <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider">Last Visit</th>
                      <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {patients.length > 0 ? patients.map((p, i) => (
                      <tr key={i} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                        <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{p.name || 'Unknown'}</td>
                        <td className="px-6 py-4 text-slate-600">{p.condition || 'N/A'}</td>
                        <td className="px-6 py-4 text-slate-600">{p.lastVisit || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide
                            ${p.status === 'Compliant' ? 'bg-emerald-100 text-emerald-700' : 
                              p.status === 'Missed Dose' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                            {p.status === 'Compliant' && <CheckCircle size={12} strokeWidth={3} />}
                            {p.status === 'Missed Dose' && <AlertCircle size={12} strokeWidth={3} />}
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                          No recent patients found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
