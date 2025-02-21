import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

load_dotenv()
user = os.getenv("POSTGRES_USER")
password = os.getenv("POSTGRES_USER_PASSWORD")

URL_DATABASE = f"postgresql://{user}:{password}@localhost/stt_database"

engine = create_engine(URL_DATABASE)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()