from fastapi import FastAPI, Form, Depends
from sqlalchemy.orm import Session
from app import database, crud, schemas, tasks  # use import absoluto se estiver rodando via uvicorn

# Cria as tabelas no banco
database.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Dependência para obter sessão do banco
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Rota raiz apenas para teste
@app.get("/")
def root():
    return {"message": "API FastAPI rodando!"}

# POST para resumir texto
@app.post("/summarize/", response_model=schemas.SummaryResponse)
async def summarize_text_endpoint(
    text: str = Form(...),
    db: Session = Depends(get_db)
):
    task = tasks.process_text_task.delay(text)
    return {
        "id": task.id,
        "summary": "Processando...",
        "insights": "Aguarde...",
        "created_at": None
    }

# GET para histórico de resumos
@app.get("/history/", response_model=list[schemas.SummaryResponse])
def get_history(db: Session = Depends(get_db)):
    return crud.get_summaries(db)
