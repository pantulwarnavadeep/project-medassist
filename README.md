# MedAssist

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10%2B-blue" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-0.110%2B-009688" alt="FastAPI" />
  <img src="https://img.shields.io/badge/React-18-61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC" alt="Tailwind CSS" />
</p>

MedAssist is a care coordination prototype that helps clinics, doctors, and patients manage appointments, prescriptions, and medication conversations. It combines a FastAPI backend, a React/Vite frontend, and integrations for SMS reminders and conversational AI.

## Overview

- Modular backend with routes, services, and SQL models
- Single-page React frontend for doctors and patients
- Integrations: Twilio for SMS, Claude service for conversational assistance, FullCalendar for scheduling

## Key features

- Doctor dashboard: patient lists, alerts, risk indicators
- Patient portal: view prescriptions, ask medication questions, receive reminders
- Appointments: create, list, and fetch by doctor or patient
- Prescriptions: create and fetch prescription records with dosage and notes
- Conversational assistant: contextual chat using prescription and appointment data

## Architecture

- backend/: FastAPI app, routes split under `routes/`, DB layer in `database.py` and `models/`
- frontend/: React + Vite app under `src/`, API client in `src/lib/api.js`
- services/: glue code for AI and Twilio integrations

## Prerequisites

- Python 3.10 or newer
- Node.js 18+ and npm
- Git configured with access to your GitHub repo (SSH key or saved credentials)

## Environment variables

Create a `.env` in the `backend/` folder or set variables in your environment. Important variables used by the project:

- `DATABASE_URL` — SQLAlchemy database URL (sqlite:///./dev.db or a Postgres URI)
- `TWILIO_ACCOUNT_SID` — Twilio account SID
- `TWILIO_AUTH_TOKEN` — Twilio auth token
- `TWILIO_PHONE_NUMBER` — From number for SMS
- `CLAUDE_API_KEY` — API key for Claude service (if used)
- `VITE_API_BASE_URL` — Frontend environment variable for API base URL (set in frontend .env when building)

## Local development

Follow these steps to run both backend and frontend locally (Windows PowerShell examples):

Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r ..\requirements.txt
# copy or create a .env file in backend/ with DATABASE_URL and other secrets
uvicorn main:app --reload --port 8000
```

Frontend

```powershell
cd frontend
npm install
# set VITE_API_BASE_URL in .env or use the default http://localhost:8000
npm run dev
```

Open the frontend at http://localhost:5173 (Vite default). The frontend expects the backend API under `/api` on the base URL.

## API endpoints (selected)

- `GET /api/` — health check
- `GET /api/prescriptions/patient/{patient_id}` — prescriptions by patient
- `POST /api/prescriptions` — create prescription
- `POST /api/chat` — conversational assistant request
- `GET /api/appointments/doctor/{doctor_id}` — appointments by doctor
- `POST /api/appointments` — create appointment

Check the `backend/routes/` folder for complete route implementations.

## Testing

- Unit/integration tests are not included in this prototype. For manual verification:
  - Use Postman or curl to call backend endpoints
  - Run the frontend and exercise the UI flows

## Deployment notes

- Use environment-specific secrets (do not hardcode API keys)
- Add authentication (OAuth/JWT) and RBAC before production use
- Configure CORS and HTTPS for a production environment

## Project structure

See these key files and folders:

- `backend/main.py` — FastAPI app entry
- `backend/database.py` — DB connection and session helper
- `backend/routes/` — API route modules (appointments, prescriptions, chatbot, twilio_webhook)
- `backend/services/` — integration helpers (claude_service, twilio_service, scheduler)
- `frontend/src/` — React source, pages for Appointments, DoctorDashboard, PatientPortal

## Contributing

- Open an issue or submit a pull request with a clear description of the change.
- Create feature branches and keep commits focused (one change per PR).

## License & contact

This repository does not include a license file; add one if you intend to publish. For questions, reach out via the repo issues.

---

If you want, I can also:

- add a `CONTRIBUTING.md` with PR/testing checklist
- add a basic `Dockerfile` and `docker-compose.yml` for local development
- create a small health-check script for CI

Tell me which follow-up you want next.
