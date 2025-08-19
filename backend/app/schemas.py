from pydantic import BaseModel
from datetime import datetime

class SummaryBase(BaseModel):
    original_text: str

class SummaryCreate(SummaryBase):
    pass

class SummaryResponse(BaseModel):
    id: int
    summary: str
    insights: str
    created_at: datetime

    class Config:
        orm_mode = True
