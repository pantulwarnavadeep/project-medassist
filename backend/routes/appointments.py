from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.models import Appointment
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

router = APIRouter()

class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    slot_time: datetime
    status: str = "pending"

class AppointmentUpdate(BaseModel):
    slot_time: Optional[datetime] = None
    status: Optional[str] = None

@router.get("/appointments/doctor/{doctor_id}")
def get_doctor_appointments(doctor_id: int, db: Session = Depends(get_db)):
    return db.query(Appointment).filter(Appointment.doctor_id == doctor_id).all()

@router.post("/appointments")
def create_appointment(data: AppointmentCreate, db: Session = Depends(get_db)):
    appointment = Appointment(**data.dict())
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment

@router.put("/appointments/{appointment_id}")
def update_appointment(appointment_id: int, data: AppointmentUpdate, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        return {"error": "Not found"}
    if data.slot_time:
        appointment.slot_time = data.slot_time
    if data.status:
        appointment.status = data.status
    db.commit()
    db.refresh(appointment)
    return appointment

@router.delete("/appointments/{appointment_id}")
def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        return {"error": "Not found"}
    db.delete(appointment)
    db.commit()
    return {"status": "deleted"}
