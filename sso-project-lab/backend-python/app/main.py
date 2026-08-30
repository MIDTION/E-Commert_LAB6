from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.models import user, product, order
from app.api.api import api_router

# Create tables
Base.metadata.create_all(bind=engine)

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
