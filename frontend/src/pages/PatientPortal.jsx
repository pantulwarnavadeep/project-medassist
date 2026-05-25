import { useState, useEffect } from 'react'
import { getPatientPrescriptions, sendChatMessage } from '../lib/api'

export default function PatientPortal({ patientId = 1 }) {
  const [prescriptions, setPrescriptions] = useState([])
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPatientPrescriptions(patientId).then(r => setPrescriptions(r.data))
  }, [patientId])

  const handleAsk = async () => {
    if (!question.trim()) return
    setMessages(m => [...m, { role: 'user', text: question }])
    setLoading(true)
    const res = await sendChatMessage(patientId, question)
    setMessages(m => [...m, { role: 'ai', text: res.data.answer }])
    setQuestion('')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-medium mb-6">Your Prescriptions</h1>

      {prescriptions.map(p => (
        <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
          <p className="font-medium">{p.medication} — {p.dosage}</p>
          <p className="text-sm text-gray-400">{p.frequency.replace('_', ' ')}</p>
          {p.notes && <p className="text-sm text-gray-500 mt-1">{p.notes}</p>}
        </div>
      ))}

      <div className="bg-white rounded-xl border border-gray-100 p-4 mt-6">
        <p className="text-sm font-medium mb-3">Ask about your prescription</p>
        <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`text-sm p-2 rounded-lg ${m.role === 'user' ? 'bg-gray-50 text-right' : 'bg-green-50 text-gray-700'}`}>
              {m.text}
            </div>
          ))}
          {loading && <p className="text-xs text-gray-400">Thinking...</p>}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
            placeholder="e.g. Can I take this on an empty stomach?"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk()}
          />
          <button onClick={handleAsk} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
            Ask
          </button>
        </div>
      </div>
    </div>
  )
}
