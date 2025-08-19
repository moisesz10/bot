# AI Summarizer Bot

Aplicação web para resumir textos e gerar insights, com backend em **FastAPI** e frontend em **React**.  
Projeto demonstrando habilidades em Python, React, SQLAlchemy, Celery e integração de APIs.

---

## Funcionalidades

- Enviar textos para resumir com processamento assíncrono via Celery.
- Visualizar histórico de resumos.
- API documentada automaticamente via FastAPI (`/docs` e `/redoc`).
- Frontend React interativo e responsivo.

---

## Tecnologias

- Backend: FastAPI, SQLAlchemy, Celery, SQLite
- Frontend: React, fetch API
- Processamento assíncrono: Celery + Redis (opcional)
- Python 3.12, Node.js

---

## Instalação e execução

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate    # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
cd ../frontend
npm install
npm start
Abra http://localhost:3000
curl -X POST "http://127.0.0.1:8000/summarize/" -F "text=Meu texto para resumir"Histórico (GET):
curl -X GET "http://127.0.0.1:8000/history/"Documentação Swagger: http://127.0.0.1:8000/docs
backend/
├─ app/
│  ├─ main.py
│  ├─ database.py
│  ├─ crud.py
│  ├─ schemas.py
│  └─ tasks.py
├─ celery_worker.py
├─ requirements.txt

frontend/
├─ src/
├─ package.json

---
MIT License
## Sugestões extras

1. Adicione **screenshots ou GIF** mostrando o frontend em ação.  
2. Explique **decisões técnicas**: FastAPI, Celery, SQLAlchemy, React.  
3. Mantenha README objetivo e claro para recrutadores.

---

Se você quiser, posso te escrever **uma lista de comandos finais para subir todo esse projeto já organizado no GitHub** de uma vez só, incluindo README e `.gitignore`. Quer que eu faça isso?

