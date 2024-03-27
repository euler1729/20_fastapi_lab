from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS", "DELETE"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['userdb']
users_collection = db['users']

class User(BaseModel):
    username: str
    password: str
    confirm_password: str
    email: EmailStr
    phone_number: str

def validate_username(username: str):
    if len(username) < 5:
        raise HTTPException(status_code=400, detail="Username must have more than five characters")
    if users_collection.find_one({"username": username}):
        raise HTTPException(status_code=400, detail="Username already exists")

def validate_password(password: str, confirm_password: str):
    if len(password) < 6:
        raise HTTPException(status_code=400, detail="Password must have more than six characters")
    if password != confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

def validate_email(email: EmailStr):
    if users_collection.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="Email already exists")

def validate_phone_number(phone_number: str):
    if len(phone_number) != 11:
        raise HTTPException(status_code=400, detail="Phone number must have exactly 11 digits")
    if users_collection.find_one({"phone_number": phone_number}):
        raise HTTPException(status_code=400, detail="Phone number already exists")

@app.post("/register/")
async def register(user: User):
    validate_username(user.username)
    validate_password(user.password, user.confirm_password)
    validate_email(user.email)
    validate_phone_number(user.phone_number)

    # Save user data to MongoDB
    user_dict = user.dict()
    users_collection.insert_one(user_dict)

    return {"message": "User registered successfully"}
