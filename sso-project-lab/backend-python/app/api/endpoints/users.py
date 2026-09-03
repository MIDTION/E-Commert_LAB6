from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import UserResponse, TopUpRequest, TopUpResponse
from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.models.user import User

router = APIRouter()

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/topup", response_model=TopUpResponse)
def topup_credit(
    payload: TopUpRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if payload.amount <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Top-up amount must be greater than 0"
        )
    
    current_user.credit_balance = round(float(current_user.credit_balance or 0.0) + float(payload.amount), 2)
    db.commit()
    db.refresh(current_user)
    
    return TopUpResponse(
        success=True,
        message=f"Successfully topped up {payload.amount} credits for {current_user.username}",
        username=current_user.username,
        amount_added=payload.amount,
        new_balance=current_user.credit_balance
    )
