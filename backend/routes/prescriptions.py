from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.models import Prescription, Patient
from services.scheduler import schedule_prescription
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class PrescriptionCreate(BaseModel):
    patient_id: int
    medication: str
    dosage: str
    frequency: str
    end_date: datetime
    notes: str = ""

@router.post("/prescriptions")
def create_prescription(data: PrescriptionCreate, db: Session = Depends(get_db)):
    prescription = Prescription(**data.dict(), start_date=datetime.utcnow())
    db.add(prescription)
    db.commit()
    db.refresh(prescription)
    patient = db.query(Patient).filter(Patient.id == data.patient_id).first()
    schedule_prescription(db, prescription, patient)
    return prescription

@router.get("/prescriptions/patient/{patient_id}")
def get_patient_prescriptions(patient_id: int, db: Session = Depends(get_db)):
    return db.query(Prescription).filter(Prescription.patient_id == patient_id).all()
