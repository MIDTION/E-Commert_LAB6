from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.product import ProductResponse, ProductCreate
from app.crud.product import get_products, get_product, create_product, delete_product
from app.api.dependencies import get_current_active_admin

router = APIRouter()

@router.get("/", response_model=List[ProductResponse])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_products(db, skip=skip, limit=limit)

@router.get("/{product_id}", response_model=ProductResponse)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_new_product(
    product: ProductCreate, 
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_active_admin)
):
    return create_product(db=db, product=product)

@router.delete("/{product_id}")
def delete_existing_product(
    product_id: int, 
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_active_admin)
):
    try:
        db_product = delete_product(db, product_id=product_id)
        if not db_product:
            raise HTTPException(status_code=404, detail="Product not found")
        return {
            "success": True, 
            "message": f"Product {product_id} ('{db_product.name}') deleted successfully",
            "deleted_product_id": product_id
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
