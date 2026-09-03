from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: str = "customer"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    credit_balance: float = 0.0
    is_active: bool

    class Config:
        from_attributes = True
        orm_mode = True

class TopUpRequest(BaseModel):
    amount: float = Field(..., gt=0, description="Amount to top up (must be greater than 0)")

class TopUpResponse(BaseModel):
    success: bool = True
    message: str
    username: str
    amount_added: float
    new_balance: float
