from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), default="customer") # 'admin' or 'customer'
    credit_balance = Column(Float, default=0.0, nullable=False)
    is_active = Column(Boolean, default=True)

    orders = relationship("Order", back_populates="owner")
