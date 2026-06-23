import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Users, Calendar as CalendarIcon, Search, Bell, Menu } from 'lucide-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import api from '../lib/api'

export default function Appointments() {
  const [events, setEvents] = useState([
    { id: '1', title: 'Alice Johnson - Routine Check', start: new Date().toISOString().split('T')[0] + 'T10:00:00' },
    { id: '2', title: 'Bob Smith - Follow up', start: new Date().toISOString().split('T')[0] + 'T14:30:00' }
  ])

  useEffect(() => {
    // In a real app, we'd fetch from api.get('/api/appointments/doctor/1')
  }, [])

  const handleDateClick = (arg) => {
    const title = prompt('Enter Patient Name for new appointment:')
    if (title) {
      setEvents([...events, {
        id: String(Date.now()),
        title,
        start: arg.dateStr,
        allDay: arg.allDay
      }])
    }
  }

  const handleEventDrop = (arg) => {
    console.log(`Appointment ${arg.event.title} dropped to ${arg.event.start}`)
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">+</div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">MedAssist</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/doctor" className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
            <Activity size={20} />
            Dashboard
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
            <Users size={20} />
            Patients
          </Link>
          <Link to="/doctor/appointments" className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium transition-colors">
            <CalendarIcon size={20} />
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
            <h1 className="text-xl font-bold text-slate-800">Calendar</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-700 to-blue-400 flex items-center justify-center text-white font-medium shadow-sm">
              Dr
            </div>
          </div>
        </header>

        {/* Calendar Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <style>{`
              .fc-toolbar-title { font-size: 1.25rem !important; font-weight: 700 !important; color: #1e293b; }
              .fc-button-primary { background-color: #2563eb !important; border-color: #2563eb !important; }
              .fc-button-primary:hover { background-color: #1d4ed8 !important; border-color: #1d4ed8 !important; }
              .fc-event { cursor: move; border-radius: 4px; padding: 2px 4px; border: none; background-color: #3b82f6; }
              .fc-timegrid-slot { height: 3em !important; }
            `}</style>
            <FullCalendar
              plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              events={events}
              dateClick={handleDateClick}
              eventDrop={handleEventDrop}
              height="75vh"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
