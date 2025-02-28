from fastapi import FastAPI
from routers import jobs
import services

app = FastAPI()
services.add_tables()
app.include_router(jobs.router)


@app.get("/")
def home():
    return {"message": "home"}

