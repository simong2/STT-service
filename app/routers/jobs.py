from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
import shutil
import models
import database
import services
import os


from fastapi.responses import JSONResponse


router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


#################################
#
# routes using 11, default
#
#################################

@router.post('/jobs/')
async def create_job(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # get a copy of the audio file to put in the database
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    job = models.TranscriptionJob(file_path=file_path)
    db.add(job)
    db.commit()
    db.refresh(job)
    print(f"Name of file: {file_path}")
    transcription = services.eleven_stt(file_path)
    job.status = "completed"
    job.transcript = transcription
    db.commit()

    return {"id": job.id, "transcript": job.transcript}


@router.get("/jobs/{job_id}")
async def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(models.TranscriptionJob).filter(models.TranscriptionJob.id == job_id).first()
    if not job:
        return {"error": f"job not found: {job_id}"}
    
    if job.status == "completed":
        return {"job_id": job.id, "transcript": job.transcript}

    else:
        return {"id": job.id, "status": job.status }



#################################
#
# routes for ibm watson stt 
#
#################################
@router.post("/jobs/ibm/")
async def create_job(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    file_path = f"uploads/{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    job = models.TranscriptionJob(file_path=file_path)
    db.add(job)
    db.commit()
    db.refresh(job)

    transcript = services.ibm_stt(file_path)
    
    job.status = "completed"
    job.transcript = transcript
    db.commit()

    return {"job_id": job.id, "transcript": transcript}


@router.get("/jobs/ibm/{job_id}")
async def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(models.TranscriptionJob).filter(models.TranscriptionJob.id == job_id).first()
    if not job:
        return {"error": f"job not found: {job_id}"}
    
    if job.status == "completed":
        return {"id": job.id, "status": job.status, "transcript": job.transcript}
    else:
        return {"id": job.id, "status": job.status }




@router.get("/delete/jobs/{job_id}")
async def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(models.TranscriptionJob).filter(models.TranscriptionJob.id == job_id).first() 
    if not job:
        return {"error": f"job_id not found: {job_id}"}

    db.delete(job)
    db.commit()
    return {"ok": True}



@router.get("/items")
def read_items(db: Session = Depends(get_db)):
    items = db.query(models.TranscriptionJob).all()
    return items
