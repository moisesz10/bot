from sqlalchemy import Column, Integer, String, Text, DateTime, func
from .database import Base

class Summary(Base):
    __tablename__ = "summaries"

    id = Column(Integer, primary_key=True, index=True)
    original_text = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)
    insights = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
