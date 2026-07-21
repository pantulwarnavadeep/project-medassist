import { useState, useEffect, useRef } from 'react'
import { Pill, Send, Bot, User, Clock, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react'
import { getPatientPrescriptions, sendChatMessage } from '../lib/api'

export default function PatientPortal({ patientId = 1 }) {
  const [prescriptions, setPrescriptions] = useState([])
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your MedAssist AI. I can answer questions about your prescriptions, dosing, and refill guidance." }
  ])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    getPatientPrescriptions(patientId)
      .then(r => setPrescriptions(r.data))
      .catch(() => {
        setPrescriptions([
          { id: 1, medication: 'Amoxicillin', dosage: '500mg', frequency: 'twice_daily', notes: 'Take after meals.' },
          { id: 2, medication: 'Lisinopril', dosage: '10mg', frequency: 'once_daily', notes: 'Take in the morning.' }
        ])
      })
  }, [patientId])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleAsk = async () => {
    if (!question.trim()) return

    const currentQuestion = question.trim()
    setMessages(m => [...m, { role: 'user', text: currentQuestion }])
    setQuestion('')
    setLoading(true)

    try {
      const res = await sendChatMessage(patientId, currentQuestion)
      setMessages(m => [...m, { role: 'ai', text: res.data.answer }])
    } catch {
      setMessages(m => [...m, { role: 'ai', text: "I'm a demo AI. In the real app, I would tell you exactly how to take your medication based on your doctor's notes!" }])
    } finally {
      setLoading(false)
    }
  }

  const quickPrompts = ['How do I take Lisinopril?', 'Can I take this with food?', 'What if I miss a dose?']

  return (
    <div className="min-h-screen bg-transparent font-sans text-slate-900 pb-12">
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 text-xl font-bold text-white shadow-sm">+</div>
            <div>
              <p className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-500 bg-clip-text text-transparent">MedAssist</p>
              <p className="text-xs text-slate-500">Patient portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">
            <span className="hidden text-sm font-semibold text-slate-600 sm:block">Jane Doe</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
              <User size={18} />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 pt-8 sm:px-6">
        <section className="rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                <Sparkles size={16} />
                Personalized care, simplified
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Your care plan, made easy to follow.</h1>
              <p className="mt-3 text-lg text-slate-600">Review active prescriptions, ask medication questions, and stay on top of your treatment.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <ShieldCheck size={16} />
                Care plan snapshot
              </div>
              <p className="mt-3 text-sm text-slate-500">2 active medications • 1 refill reminder • AI chat ready</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-white p-3 shadow-sm">Medication reminders will be sent via SMS when enabled.</div>
                <div className="rounded-2xl bg-white p-3 shadow-sm">Your chat history is private and only used for care guidance.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-teal-700">Quick actions</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Try one of these prompts</h2>
            <p className="mt-2 text-sm text-teal-700/90">Ask about your dose, timing, or how to take medications safely.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {quickPrompts.map(text => (
                <button
                  key={text}
                  onClick={() => setQuestion(text)}
                  className="rounded-2xl border border-teal-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:border-teal-300 hover:bg-teal-100"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Medication health</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{prescriptions.length} active prescriptions</h2>
            <p className="mt-3 text-sm text-slate-500">Review your current medications and ask the AI if you need a refill or dose reminder.</p>
          </div>
        </div>

        <section>
          <div className="mb-5 flex items-center gap-2.5">
            <div className="rounded-xl bg-teal-100 p-2 text-teal-600">
              <Pill size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Active Prescriptions</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {prescriptions.map(p => (
              <div key={p.id} className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-teal-500 to-blue-500"></div>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-slate-900">{p.medication}</h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-600">
                    {p.dosage}
                  </span>
                </div>

                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Clock size={16} className="text-slate-400" />
                  <span className="capitalize">{p.frequency.replace('_', ' ')}</span>
                </div>

                {p.notes && (
                  <div className="flex items-start gap-2.5 rounded-2xl border border-amber-100 bg-amber-50 p-3.5 text-sm text-amber-800">
                    <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-500" />
                    <p className="leading-snug">{p.notes}</p>
                  </div>
                )}
              </div>
            ))}
            {prescriptions.length === 0 && (
              <div className="rounded-[24px] border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500 lg:col-span-2">
                No active prescriptions found.
              </div>
            )}
          </div>
        </section>

        <section className="flex h-[560px] flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 bg-white p-4 sm:p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 text-white shadow-md">
              <Bot size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">MedAssist AI</h2>
              <p className="text-sm font-medium text-slate-500">Always here to help with your medications</p>
            </div>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/60 p-5">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'ai' && (
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 shadow-sm">
                    <Bot size={16} />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
                  m.role === 'user'
                    ? 'rounded-br-none bg-blue-600 font-medium text-white'
                    : 'rounded-bl-none border border-slate-100 bg-white text-slate-700'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 shadow-sm">
                  <Bot size={16} />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-none border border-slate-100 bg-white px-5 py-4 shadow-sm">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="border-t border-slate-100 bg-white p-4">
            <div className="relative flex items-center">
              <input
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-3.5 pl-5 pr-14 text-[15px] shadow-inner transition-all placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                placeholder="Ask about your prescriptions..."
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAsk()}
              />
              <button
                onClick={handleAsk}
                disabled={!question.trim() || loading}
                className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white shadow-sm transition-all hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-slate-300 active:scale-95"
              >
                <Send size={18} className="ml-0.5" />
              </button>
            </div>
            <p className="mt-3 text-center text-xs font-medium text-slate-400">
              AI can make mistakes. Always consult your doctor for medical advice.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
