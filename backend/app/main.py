from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .services.email_service import send_email

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    name: str
    email: str
    message: str

@app.post("/send-message")
def send_message(data: Message):
    send_email(data.name, data.email, data.message)
    return {"status": "Email sent successfully"}
