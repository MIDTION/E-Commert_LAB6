from sqlalchemy.orm import Session
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate
from fastapi import HTTPException

def create_order(db: Session, order: OrderCreate, user_id: int):
    total_price = 0
    db_order_items = []
    
    for item in order.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if product.stock < item.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {product.name}")
        
        # Reduce stock
        product.stock -= item.quantity
        
        price = product.price * item.quantity
        total_price += price
        db_order_items.append(OrderItem(product_id=item.product_id, quantity=item.quantity, price=product.price))

    db_order = Order(user_id=user_id, total_price=total_price, items=db_order_items)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_user_orders(db: Session, user_id: int):
    return db.query(Order).filter(Order.user_id == user_id).all()

def update_order_status(db: Session, order_id: int, status: str):
    order = db.query(Order).filter(Order.id == order_id).first()
    if order:
        # If order is being cancelled, restore the stock
        if status.lower() == "cancelled" and order.status.lower() != "cancelled":
            for item in order.items:
                product = db.query(Product).filter(Product.id == item.product_id).first()
                if product:
                    product.stock += item.quantity
        
        order.status = status
        db.commit()
        db.refresh(order)
    return order
