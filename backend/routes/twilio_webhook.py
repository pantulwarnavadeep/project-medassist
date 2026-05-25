from fastapi import APIRouter, Request, Form
from sqlalchemy.orm import Session
from database import get_db
from models.models import Reminder
from fastapi import Depends
from datetime import datetime

router = APIRouter()

@router.post("/twilio/webhook")
async def twilio_reply(From: str = Form(...), Body: str = Form(...), db: Session = Depends(get_db)):
    if Body.strip().upper() == "YES":
        # Find most recent pending reminder for this phone number
        # Mark it confirmed
        pass  # wire up to your Reminder model here
    return {"status": "received"}
