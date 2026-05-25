from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

scheduler = BackgroundScheduler()

FREQUENCY_MAP = {
    "once_daily": [9],
    "twice_daily": [8, 20],
    "three_daily": [8, 14, 20]
}

def schedule_prescription(db: Session, prescription, patient):
    from models.models import Reminder
    hours = FREQUENCY_MAP.get(prescription.frequency, [9])
    start = prescription.start_date
    end = prescription.end_date
    current = start

    while current <= end:
        for hour in hours:
            reminder_time = current.replace(hour=hour, minute=0, second=0)
            reminder = Reminder(
                prescription_id=prescription.id,
                scheduled_time=reminder_time,
                channel="sms",
                status="scheduled"
            )
            db.add(reminder)
        current += timedelta(days=1)
    db.commit()

def start_scheduler():
    scheduler.start()
