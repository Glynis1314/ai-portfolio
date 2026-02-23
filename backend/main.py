from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

OPENROUTER_KEY = "YOUR_API_KEY"

class Chat(BaseModel):
    message: str

@app.post("/chat")
def chat(data: Chat):

    resume = open("resume.txt").read()

    prompt = f"""
You are answering strictly from this resume:

{resume}

User question: {data.message}
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_KEY}"
        },
        json={
            "model": "mistralai/mistral-7b-instruct",
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
    )

    return response.json()