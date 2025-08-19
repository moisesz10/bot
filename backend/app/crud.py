from sqlalchemy.orm import Session
from . import models, schemas

def create_summary(db: Session, original_text: str, summary: str, insights: str):
    db_summary = models.Summary(
        original_text=original_text,
        summary=summary,
        insights=insights
    )
    db.add(db_summary)
    db.commit()
    db.refresh(db_summary)
    return db_summary

def get_summaries(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Summary).offset(skip).limit(limit).all()
