# FastAPI ties together the APIs and HTTP requests to the backend fully
# Using FastAPI instead of REST or Flask APIs since it's easier and quicker to implement for a simple demo
from fastapi import FastAPI, HTTPException
# Pydantic validates the data we use as an extra check
from pydantic import BaseModel
# We're using a very cheap and small ChatGPT model (gpt-5-mini)
# Reference: https://platform.openai.com/docs/pricing
import openai
import os 
from dotenv import load_dotenv
# Communicates with frontend
# Reference: https://fastapi.tiangolo.com/tutorial/cors/
from fastapi.middleware.cors import CORSMiddleware
from ml_service import generate_forecast

# Load in ChatGPT API key
load_dotenv()

app = FastAPI()

# Connect with React frontend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Pydantic models to get the different requests
# Login, Two-Factor (Dummy), and ChatGPT Integration
class LoginRequest(BaseModel):
    email: str
    password: str

class TwoFARequest(BaseModel):
    email: str
    code: str

class AIRequest(BaseModel):
    prompt: str
    context_data: dict

# Endpoints to tie it together

# Forecast data
@app.get("/api/dashboard-data")
def get_dashboard_data():
    try:
        forecast_data = generate_forecast()
        return forecast_data
    except Exception as e:
        # HTTP issue
        raise HTTPException(status_code=500, detail=f"Error generating forecast data: {e}")

# Login and Two-Factor Authentication (Mock for demo)
@app.post("/api/login")
def login(data: LoginRequest):
    if "@" in data.email and len(data.password) >= 8:
        return {"status": "2FA_REQUIRED", "message": "Enter code 56789"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/api/verify2fa")
def verify_2fa(data: TwoFARequest):
    if data.code == "56789":
        return {"status": "SUCCESS", "message": "Login successful", "token": "dummy_token"}
    raise HTTPException(status_code=401, detail="Invalid 2FA code")

# ChatGPT AI Integration
@app.post("/api/ai-chat")
def ai_chat(data: AIRequest):
    messages = [
        {"role": "system", "content": f"You are a helpful assistant that reads in financial data and helps the user infer reasoning from it. Here is the current market data context: {data.context_data}"},
        {"role": "user", "content": data.prompt},
    ]

    try: 
        response = client.chat.completions.create(
            model="gpt-5-mini",
            messages=messages,
            # Setting max tokens for limits and cost reduction (even though the price is in cents)
            max_completion_tokens=150,
            # Temperature sets how effective the AI model is at reasoning
            # 0.75 should be good for analyzing and explaining the data values
            temperature=0.75,
        )
        ai_reply = response.choices[0].message['content'].strip()
        
        return {"analysis": ai_reply}
    except Exception as e:
        print(f"OpenAI Error: {e}")
        raise HTTPException(status_code=500, detail=f"Error in ChatGPT request: {e}")