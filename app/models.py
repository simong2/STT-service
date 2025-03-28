from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base
from sqlalchemy.dialects.postgresql import JSONB


class TranscriptionJob(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    file_path = Column(String, nullable=False)
    status = Column(String, default="pending")
    transcript = Column(Text, nullable=True) 
    context_text = Column(Text, nullable=True) 
    speaker_info = Column(JSONB, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now())
