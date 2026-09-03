from pydantic import BaseModel
from typing import List, Optional

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: float
    # only ever visible to the buyer via their own order history, never in
    # the public product listing (see ProductResponse)
    credential_username: Optional[str] = None
    credential_password: Optional[str] = None
    product_name: Optional[str] = None
    product_image: Optional[str] = None

    class Config:
        orm_mode = True

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]

class OrderResponse(BaseModel):
    id: int
    user_id: int
    status: str
    total_price: float
    items: List[OrderItemResponse]

    class Config:
        orm_mode = True
