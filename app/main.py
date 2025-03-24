from fastapi import FastAPI
from routers import jobs
import services

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
services.add_tables()


app.include_router(jobs.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # next js default route
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def home():
    return {"status": "API is up and running"}
