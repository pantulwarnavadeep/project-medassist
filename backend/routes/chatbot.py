from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.models import Prescription, Patient, Doctor
from services.claude_service import ask_claude
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    patient_id: int
    question: str

@router.post("/chat")
def chat(req: ChatRequest, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == req.patient_id).first()
    doctor = db.query(Doctor).filter(Doctor.id == patient.doctor_id).first()
    prescriptions = db.query(Prescription).filter(
        Prescription.patient_id == req.patient_id
    ).all()
    
    prescription_data = [
        {"medication": p.medication, "dosage": p.dosage,
         "frequency": p.frequency, "notes": p.notes}
        for p in prescriptions
    ]
    
    answer = ask_claude(req.question, prescription_data, doctor.name)
    return {"answer": answer}
