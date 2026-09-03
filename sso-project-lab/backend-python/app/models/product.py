from sqlalchemy import Column, Integer, String, Text, Float
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True, nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    category = Column(String(50), default="pc")
    image = Column(String(255), nullable=True)
    # game account credential handed to the buyer once purchased (admin-only, never in public listing)
    credential_username = Column(String(100), nullable=True)
    credential_password = Column(String(100), nullable=True)
