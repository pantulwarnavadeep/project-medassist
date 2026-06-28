# MedAssist

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10%2B-blue" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-0.110%2B-009688" alt="FastAPI" />
  <img src="https://img.shields.io/badge/React-18-61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC" alt="Tailwind CSS" />
</p>

MedAssist is a modern care coordination platform designed to help clinics, doctors, and patients stay connected around appointments, prescriptions, and medication support.

## ✨ Why MedAssist?

- AI-assisted patient conversations with context from prescriptions and doctor notes
- A doctor dashboard for alerts, compliance tracking, and patient oversight
- A patient portal for prescriptions, reminders, and guided medication support
- A modular architecture that separates backend services, API routes, and frontend experiences

## 🚀 Core features

- Doctor dashboard with patient risk visibility and actionable alerts
- Appointment calendar for scheduling and rescheduling
- Prescription management with dosage, frequency, and notes
- Conversational medication assistant for patient questions
- Twilio-powered reminders and notification workflows

## 🛠️ Tech stack

- Backend: Python, FastAPI, SQLAlchemy
- Frontend: React, Vite, Tailwind CSS
- Integrations: Twilio, Claude AI service, FullCalendar

## ▶️ Getting started

### Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r ..\requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open the app at http://localhost:5173.

## 📡 API highlights

- GET /api/ — health check
- GET /api/prescriptions/patient/{patient_id} — fetch prescriptions for a patient
- POST /api/prescriptions — add a prescription
- POST /api/chat — submit a patient chat request
- GET /api/appointments/doctor/{doctor_id} — fetch appointments
- POST /api/appointments — create an appointment

## 🧭 Recommended workflow

1. Start the backend on port 8000
2. Start the frontend on port 5173
3. Use the doctor dashboard for practice overviews and alerts
4. Use the patient portal for medication questions and active prescriptions

## 🔒 Deployment notes

- Configure the frontend to use VITE_API_BASE_URL for the backend base URL in production
- Protect patient data and avoid using demo credentials in real environments
- Add authentication and role-based access control before going live

## 🌱 Planned improvements

- User authentication and patient login
- Medication adherence analytics
- Smarter reminder workflows and SMS history
- Stronger AI prompt review and medical validation
