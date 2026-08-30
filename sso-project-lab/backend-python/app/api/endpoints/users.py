from fastapi import APIRouter, Depends
from app.schemas.user import UserResponse
from app.api.dependencies import get_current_user

router = APIRouter()

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user = Depends(get_current_user)):
    return current_user
