from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import prescriptions, chatbot, twilio_webhook
from services.scheduler import start_scheduler

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prescriptions.router, prefix="/api")
app.include_router(chatbot.router, prefix="/api")
app.include_router(twilio_webhook.router, prefix="/api")

start_scheduler()

@app.get("/")
def root():
    return {"status": "MedAssist API running"}
