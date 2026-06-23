import { useState, useEffect, useRef } from 'react'
import { Pill, Send, Bot, User, Clock, AlertCircle } from 'lucide-react'
import { getPatientPrescriptions, sendChatMessage } from '../lib/api'

export default function PatientPortal({ patientId = 1 }) {
  const [prescriptions, setPrescriptions] = useState([])
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your MedAssist AI. Ask me any questions about your prescriptions or side effects." }
  ])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    // Mocking api call for demo purposes if backend isn't connected
    getPatientPrescriptions(patientId).then(r => setPrescriptions(r.data)).catch(() => {
      setPrescriptions([
        { id: 1, medication: 'Amoxicillin', dosage: '500mg', frequency: 'twice_daily', notes: 'Take after meals.' },
        { id: 2, medication: 'Lisinopril', dosage: '10mg', frequency: 'once_daily', notes: 'Take in the morning.' }
      ])
    })
  }, [patientId])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleAsk = async () => {
    if (!question.trim()) return
    setMessages(m => [...m, { role: 'user', text: question }])
    setQuestion('')
    setLoading(true)
    try {
      const res = await sendChatMessage(patientId, question)
      setMessages(m => [...m, { role: 'ai', text: res.data.answer }])
    } catch(e) {
      setTimeout(() => {
        setMessages(m => [...m, { role: 'ai', text: "I'm a demo AI. In the real app, I would tell you exactly how to take your medication based on your doctor's notes!" }])
        setLoading(false)
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-sm">+</div>
             <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-500">MedAssist</span>
          </div>
          <div className="flex items-center gap-3 cursor-pointer group">
            <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors hidden sm:block">Jane Doe</span>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 transition-colors shadow-sm">
               <User size={20} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-10">
        
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Care Plan</h1>
          <p className="text-slate-500 mt-2 text-lg">Manage your prescriptions and ask questions safely.</p>
        </div>

        {/* Prescriptions List */}
        <section>
          <div className="flex items-center gap-2.5 mb-5">
             <div className="bg-teal-100 p-2 rounded-lg text-teal-600">
               <Pill size={20} />
             </div>
             <h2 className="text-xl font-bold text-slate-800">Active Prescriptions</h2>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {prescriptions.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-500 group-hover:bg-teal-400 transition-colors"></div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-xl text-slate-900">{p.medication}</h3>
                  <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full font-bold tracking-wide">
                    {p.dosage}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-4 font-medium">
                  <Clock size={16} className="text-slate-400" />
                  <span className="capitalize">{p.frequency.replace('_', ' ')}</span>
                </div>

                {p.notes && (
                  <div className="bg-amber-50 border border-amber-100/50 rounded-xl p-3.5 text-sm text-amber-800 flex gap-2.5 items-start">
                     <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                     <p className="font-medium leading-snug">{p.notes}</p>
                  </div>
                )}
              </div>
            ))}
            {prescriptions.length === 0 && (
              <div className="col-span-2 p-8 text-center bg-white border border-slate-200 border-dashed rounded-2xl text-slate-500">
                No active prescriptions found.
              </div>
            )}
          </div>
        </section>

        {/* AI Chat Interface */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[550px] overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-white flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 flex items-center justify-center text-white shadow-md">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900">MedAssist AI</h2>
              <p className="text-sm text-slate-500 font-medium">Always here to help with your medications</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Bot size={16} />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-[15px] shadow-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none font-medium' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Bot size={16} />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-5 py-4 flex gap-1.5 items-center shadow-sm">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-14 py-3.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400 shadow-inner"
                placeholder="Ask about your prescriptions..."
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAsk()}
              />
              <button 
                onClick={handleAsk} 
                disabled={!question.trim() || loading}
                className="absolute right-2 p-2.5 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-full transition-all flex items-center justify-center shadow-sm hover:shadow active:scale-95"
              >
                <Send size={18} className="ml-0.5" />
              </button>
            </div>
            <p className="text-center text-xs text-slate-400 mt-3 font-medium">
              AI can make mistakes. Always consult your doctor for medical advice.
            </p>
          </div>
        </section>

      </main>
    </div>
  )
}
