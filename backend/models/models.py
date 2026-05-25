from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    patients = relationship("Patient", back_populates="doctor")

class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    phone = Column(String)
    email = Column(String)
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    doctor = relationship("Doctor", back_populates="patients")
    prescriptions = relationship("Prescription", back_populates="patient")

class Prescription(Base):
    __tablename__ = "prescriptions"
    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    medication = Column(String)
    dosage = Column(String)
    frequency = Column(String)  # once_daily, twice_daily, three_daily
    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime)
    notes = Column(String)
    patient = relationship("Patient", back_populates="prescriptions")
    reminders = relationship("Reminder", back_populates="prescription")

class Reminder(Base):
    __tablename__ = "reminders"
    id = Column(Integer, primary_key=True)
    prescription_id = Column(Integer, ForeignKey("prescriptions.id"))
    scheduled_time = Column(DateTime)
    channel = Column(String)  # sms, call, email
    status = Column(String, default="scheduled")  # scheduled, sent, confirmed, missed
    confirmed_at = Column(DateTime, nullable=True)
    prescription = relationship("Prescription", back_populates="reminders")

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    slot_time = Column(DateTime)
    status = Column(String, default="pending")  # pending, approved, cancelled
    payment_status = Column(String, default="unpaid")  # unpaid, paid
    payment_amount = Column(Integer)
