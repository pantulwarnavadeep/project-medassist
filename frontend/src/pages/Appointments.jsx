import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Users, Calendar as CalendarIcon, Bell, Menu } from 'lucide-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function Appointments() {
  const [events, setEvents] = useState([
    { id: '1', title: 'Alice Johnson - Routine Check', start: new Date().toISOString().split('T')[0] + 'T10:00:00' },
    { id: '2', title: 'Bob Smith - Follow up', start: new Date().toISOString().split('T')[0] + 'T14:30:00' }
  ])

  useEffect(() => {
    // In a real app, we'd fetch from an appointments API endpoint.
  }, [])

  const handleDateClick = (arg) => {
    const title = prompt('Enter patient name for new appointment:')
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
    console.log(`Appointment ${arg.event.title} moved to ${arg.event.start}`)
  }

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
          <Link to="/doctor" className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900">
            <Activity size={20} />
            Dashboard
          </Link>
          <Link to="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900">
            <Users size={20} />
            Patients
          </Link>
          <Link to="/doctor/appointments" className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-2.5 font-medium text-blue-700 transition-colors">
            <CalendarIcon size={20} />
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
            <div>
              <h1 className="text-xl font-bold text-slate-800">Appointment Calendar</h1>
              <p className="text-sm text-slate-500">Drag to reschedule or tap a day to add a new visit.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
              <Bell size={20} />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-700 to-blue-400 font-medium text-white shadow-sm">
              Dr
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="mx-auto max-w-6xl rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">Today: 4 upcoming visits</p>
                <p className="text-sm text-slate-500">Keep your schedule balanced and patient-ready.</p>
              </div>
              <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">Live calendar</div>
            </div>
            <style>{`
              .fc-toolbar-title { font-size: 1.2rem !important; font-weight: 700 !important; color: #1e293b; }
              .fc-button-primary { background-color: #2563eb !important; border-color: #2563eb !important; box-shadow: none !important; }
              .fc-button-primary:hover { background-color: #1d4ed8 !important; border-color: #1d4ed8 !important; }
              .fc-event { cursor: move; border-radius: 8px; padding: 2px 6px; border: none; background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%); }
              .fc-timegrid-slot { height: 3em !important; }
            `}</style>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
