from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock: int = 0
    category: Optional[str] = "pc"
    image: Optional[str] = None

class ProductCreate(ProductBase):
    # admin-only at creation time; deliberately NOT on ProductBase/ProductResponse
    # so the public product listing never leaks it to browsing customers
    credential_username: Optional[str] = None
    credential_password: Optional[str] = None

class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True
        orm_mode = True
