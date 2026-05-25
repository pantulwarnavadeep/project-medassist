from twilio.rest import Client
from dotenv import load_dotenv
import os

load_dotenv()
client = Client(os.getenv("TWILIO_ACCOUNT_SID"), os.getenv("TWILIO_AUTH_TOKEN"))
FROM_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

def send_sms(to_number: str, message: str):
    client.messages.create(body=message, from_=FROM_NUMBER, to=to_number)

def make_call(to_number: str, patient_name: str, medication: str, dosage: str):
    twiml = f"""<Response>
      <Say voice="Polly.Aditi">
        Hello {patient_name}, this is your AI health assistant.
        It is time to take your {dosage} of {medication}.
        Please reply YES to confirm once you have taken it.
      </Say>
    </Response>"""
    client.calls.create(twiml=twiml, to=to_number, from_=FROM_NUMBER)
