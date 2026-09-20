from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SensorData(BaseModel):
    co2: float
    co: float
    temperature: float
    humidity: float


latest_data = {
    "co2": 620,
    "co": 4.2,
    "temperature": 31.2,
    "humidity": 62
}


@app.get("/")
def home():
    return {
        "message": "Carbon Emission Backend is running"
    }


@app.post("/sensor-data")
def receive_sensor_data(data: SensorData):

    global latest_data

    latest_data = data.model_dump()

    print("Received sensor data:")
    print(latest_data)

    return {
        "status": "success",
        "message": "Sensor data received",
        "data": latest_data
    }


@app.get("/sensor-data")
def get_sensor_data():

    return latest_data