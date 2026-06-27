# MedAssist Frontend

This frontend powers the MedAssist patient and doctor experiences using React, Vite, Tailwind CSS, and FullCalendar.

## Run locally

```powershell
cd frontend
npm install
npm run dev
```

The app expects the backend API at `http://localhost:8000/api` by default.

## Optional environment variable

To change the backend URL, create a `.env` file in `frontend` and add:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Key files

- `src/App.jsx` — main router and page routes
- `src/pages/DoctorDashboard.jsx` — doctor overview with alerts and patient status
- `src/pages/Appointments.jsx` — appointment calendar and scheduling
- `src/pages/PatientPortal.jsx` — patient prescriptions and AI chat
- `src/lib/api.js` — API helper functions
