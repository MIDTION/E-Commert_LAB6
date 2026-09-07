from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.order import OrderCreate, OrderResponse
from app.crud.order import create_order, get_user_orders, update_order_status
from app.api.dependencies import get_current_user, get_current_active_admin

router = APIRouter()

@router.post("/", response_model=OrderResponse)
def create_new_order(
    order: OrderCreate, 
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return create_order(db=db, order=order, user_id=current_user.id)

@router.get("/my-orders", response_model=List[OrderResponse])
def read_my_orders(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_user_orders(db=db, user_id=current_user.id)

@router.put("/{order_id}/status", response_model=OrderResponse)
def update_status(
    order_id: int, 
    status: str, 
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_active_admin)
):
    db_order = update_order_status(db, order_id=order_id, status=status)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order
