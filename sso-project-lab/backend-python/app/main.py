from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.core.database import engine, Base
from app.models import user, product, order
from app.api.api import api_router

# Create tables if not exist
Base.metadata.create_all(bind=engine)

# Safe auto-migration for existing tables
with engine.connect() as conn:
    try:
        conn.execute(text("ALTER TABLE users ADD COLUMN credit_balance FLOAT DEFAULT 0.0"))
        conn.commit()
    except Exception:
        pass
    try:
        conn.execute(text("ALTER TABLE products ADD COLUMN category VARCHAR(50) DEFAULT 'pc'"))
        conn.commit()
    except Exception:
        pass
    try:
        conn.execute(text("ALTER TABLE products ADD COLUMN image VARCHAR(255) NULL"))
        conn.commit()
    except Exception:
        pass

app = FastAPI(
    title="E-Commerce API", 
    description="Backend for SSO Project Lab",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Welcome to E-Commerce API"}
