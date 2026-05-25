import anthropic
from dotenv import load_dotenv
import os, json

load_dotenv()
client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def ask_claude(patient_question: str, prescription_data: dict, doctor_name: str) -> str:
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=500,
        system=f"""You are a medication assistant for a patient. 
Answer ONLY based on the prescription data below. 
Do not give any new medical advice or diagnoses.
If the question is outside this scope, say: 
"I can only answer questions about your current prescription. Please contact Dr. {doctor_name} directly."

Prescription data:
{json.dumps(prescription_data, indent=2)}""",
        messages=[{"role": "user", "content": patient_question}]
    )
    return message.content[0].text
