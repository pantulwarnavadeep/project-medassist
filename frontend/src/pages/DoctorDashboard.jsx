import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Users, Calendar, AlertCircle, Bell, Search, Menu, CheckCircle, Sparkles } from 'lucide-react'
import api from '../lib/api'

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([])

  useEffect(() => {
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
    <div className="flex h-screen bg-transparent font-sans text-slate-900">
      <aside className="hidden w-64 flex-col border-r border-slate-200/80 bg-white/80 backdrop-blur-xl md:flex">
        <div className="flex items-center gap-3 border-b border-slate-100 p-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-sm">+</div>
          <div>
            <p className="text-xl font-bold bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">MedAssist</p>
            <p className="text-xs text-slate-500">Clinical workspace</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <Link to="/doctor" className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-2.5 font-medium text-blue-700 transition-colors">
            <Activity size={20} />
            Dashboard
          </Link>
          <Link to="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900">
            <Users size={20} />
            Patients
          </Link>
          <Link to="/doctor/appointments" className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900">
            <Calendar size={20} />
            Appointments
          </Link>
        </nav>
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="z-10 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 md:hidden">
              <Menu size={24} />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search patients..."
                className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
              <Bell size={20} />
              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500"></span>
            </button>
            <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-blue-700 to-blue-400 font-medium text-white shadow-sm transition-shadow hover:shadow-md">
              Dr
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, Dr. Smith</h1>
              <p className="mt-1 text-slate-500">Here is your practice overview for today.</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[28px] bg-gradient-to-r from-sky-600 to-cyan-500 p-6 text-white shadow-lg">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
                  <Sparkles size={14} />
                  Smart workflow
                </div>
                <h2 className="mt-4 text-2xl font-semibold">4 medication alerts ready</h2>
                <p className="mt-3 text-sm text-sky-100/90">AI-guided summaries highlight missed doses and follow-up actions so you can prioritize care quickly.</p>
              </div>
              <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Patient insight</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">97% adherence trend</h2>
                <p className="mt-3 text-sm text-slate-500">Track patient compliance and see which cases need a timely intervention.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
              {stats.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} className="group cursor-pointer rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="mb-4 flex items-start justify-between">
                      <div className={`rounded-xl p-3 ${s.bg} ${s.color} transition-transform duration-300 group-hover:scale-110`}>
                        <Icon size={22} strokeWidth={2.5} />
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-medium text-slate-500">{s.label}</p>
                      <h3 className="text-3xl font-bold tracking-tight text-slate-900">{s.value}</h3>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                <h2 className="text-lg font-bold text-slate-800">Recent Patients</h2>
                <button className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50/60 text-slate-500">
                    <tr>
                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider">Patient Name</th>
                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider">Condition</th>
                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider">Last Visit</th>
                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {patients.length > 0 ? patients.map((p, i) => (
                      <tr key={i} className="cursor-pointer transition-colors hover:bg-slate-50/80">
                        <td className="px-6 py-4 font-medium text-slate-900">{p.name || 'Unknown'}</td>
                        <td className="px-6 py-4 text-slate-600">{p.condition || 'N/A'}</td>
                        <td className="px-6 py-4 text-slate-600">{p.lastVisit || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide ${
                            p.status === 'Compliant' ? 'bg-emerald-100 text-emerald-700' :
                            p.status === 'Missed Dose' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}> 
                            {p.status === 'Compliant' && <CheckCircle size={12} strokeWidth={3} />}
                            {p.status === 'Missed Dose' && <AlertCircle size={12} strokeWidth={3} />}
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No recent patients found.</td>
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
