import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

EMAIL = os.getenv("EMAIL_ADDRESS")
PASSWORD = os.getenv("EMAIL_PASSWORD")


def send_email(name, sender_email, message):
    msg = EmailMessage()
    msg["Subject"] = f"New Portfolio Message from {name}"
    msg["From"] = EMAIL
    msg["To"] = EMAIL

    msg.set_content(f"""
Name: {name}
Sender Email: {sender_email}

Message:
{message}
""")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(EMAIL, PASSWORD)
        smtp.send_message(msg)
