# MedAssist

MedAssist is a care coordination assistant for clinics, helping doctors, patients, and care teams manage appointments, prescriptions, and medication guidance in one place.

## Why it stands out

- AI-aware patient chat that uses prescription context and doctor notes.
- Doctor dashboard with medication compliance and alert tracking.
- Patient portal that surfaces prescriptions, reminders, and conversational support.
- Modular backend built with FastAPI plus a modern React + Vite frontend.

## Features

- Doctor dashboard with patient risk status and alerts.
- Appointment calendar for scheduling and rescheduling.
- Patient prescription list with dosage, frequency, and notes.
- Conversational medication assistant for patient questions.
- Twilio webhook integration for SMS reminders and notifications.

## Tech stack

- Backend: Python, FastAPI, SQLAlchemy
- Frontend: React, Vite, Tailwind CSS
- Integrations: Twilio, Claude AI service, FullCalendar

## Getting started

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

Open the app at `http://localhost:5173`.

## API endpoints

- `GET /api/` — health check
- `GET /api/prescriptions/patient/{patient_id}` — fetch prescriptions for a patient
- `POST /api/prescriptions` — add a prescription
- `POST /api/chat` — submit a patient chat request
- `GET /api/appointments/doctor/{doctor_id}` — fetch appointments
- `POST /api/appointments` — create an appointment

## Recommended workflow

1. Start the backend on port `8000`.
2. Start the frontend on port `5173`.
3. Use the doctor dashboard for practice overviews and alerts.
4. Use the patient portal for medication questions and active prescriptions.

## Deployment notes

- Configure the frontend to use `VITE_API_BASE_URL` for the backend base URL when deploying.
- Secure real patient data and avoid using demo credentials in production.
- Add authentication and role-based access control before going live.

## Improvements to add next

- user authentication and patient login
- medication adherence analytics
- appointment reminder SMS workflow
- full Twilio notification history and retry handling
- secure AI prompt review and medical validation
