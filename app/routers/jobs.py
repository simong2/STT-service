from fastapi import APIRouter, Depends, Form, UploadFile, File, HTTPException, Header
from sqlalchemy.orm import Session
import shutil
import models
import database
import services
import os
import json

# from fastapi.responses import JSONResponse
from typing import Optional

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# api key
SECRET_KEY = os.environ.get('KEY')

def api_key_check(api_key: str = Header(...)):
    if api_key != SECRET_KEY:
        raise HTTPException(status_code=403, detail="Error 403 - Forbidden")
    


##############################
#
# routes using 11, default
#
##############################

@router.post('/jobs/')
async def create_job(api_key: str = Depends(api_key_check), file: UploadFile = File(...), db: Session = Depends(get_db), speaker0: Optional[str] = Form(None), speaker1: Optional[str] = Form(None)):
    # get a copy of the audio file to put in the database
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    job = models.TranscriptionJob(file_path=file_path)
    db.add(job)
    db.flush()

    print(f"Name of file: {file_path}")
    transcription = services.eleven_stt(file_path)

    job.status = "completed"
    job.transcript = transcription

    if speaker0 and speaker1:
        job.speaker_info = json.dumps({"Speaker 0": speaker0, "Speaker 1": speaker1})
    else:
        t_json = services.open_ai_get_speakers(transcription)
        
        # makes sure return from openai api is dict, if not just default to speaker 0/1
        if isinstance(t_json, dict):
            job.speaker_info = json.dumps(t_json)
        else:
            job.speaker_info = json.dumps({"Speaker 0": "Speaker 0", "Speaker 1": "Speaker 1"})


    # speaker info 
    s = json.loads(job.speaker_info)
    job.context_text = services.open_ai_contextualize(transcription, s)

    db.commit()

    return {"id": job.id, "transcript": job.transcript, "speaker_info": job.speaker_info, "context_text": job.context_text}


@router.get("/jobs/{job_id}")
async def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(models.TranscriptionJob).filter(models.TranscriptionJob.id == job_id).first()
    if not job:
        return {"error": f"job not found: {job_id}"}
    
    speakers = json.loads(job.speaker_info)
    if job.status == "completed":
        return {"job_id": job.id, "transcript": job.transcript, "speaker_info" : speakers, "context_text": job.context_text}
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



@router.get("/all-jobs")
def read_items(db: Session = Depends(get_db)):
    items = db.query(models.TranscriptionJob).all()
    return items



@router.post("/jobs/update-context/{job_id}")
def update_context(job_id: int, db: Session = Depends(get_db)):
    job = db.query(models.TranscriptionJob).filter(models.TranscriptionJob.id == job_id).first() 
    if not job:
        return {"error": f"job_id not found: {job_id}"}

    speakers = json.loads(job.speaker_info)
    updated_context = services.open_ai_update_text(job.transcript, speakers, job.context_text)
    job.context_text = updated_context
    db.commit()
    return {"id": job_id, "context_text": job.context_text}

