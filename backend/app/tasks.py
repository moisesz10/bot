from celery import Celery
from .database import SessionLocal
from . import crud, ai_service

celery = Celery(
    "tasks",
    broker="redis://redis:6379/0",
    backend="redis://redis:6379/0"
)

@celery.task
def process_text_task(text: str):
    db = SessionLocal()
    summary, insights = ai_service.summarize_text(text)
    crud.create_summary(db, text, summary, insights)
    db.close()
