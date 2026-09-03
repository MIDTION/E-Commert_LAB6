from sqlalchemy.orm import Session
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.user import User
from app.schemas.order import OrderCreate
from fastapi import HTTPException, status

def create_order(db: Session, order: OrderCreate, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    total_price = 0
    db_order_items = []
    products_to_update = []
    
    for item in order.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if product.stock < item.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {product.name} (Available: {product.stock})")
        
        price = product.price * item.quantity
        total_price += price
        products_to_update.append((product, item.quantity))
        db_order_items.append(OrderItem(product_id=item.product_id, quantity=item.quantity, price=product.price))

    # Check credit balance
    current_balance = float(user.credit_balance or 0.0)
    if current_balance < total_price:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Insufficient credit balance. Required: {total_price:.2f} ฿, Available: {current_balance:.2f} ฿. Please top up your credit."
        )

    # Deduct credit and reduce stock
    user.credit_balance = round(current_balance - total_price, 2)
    for product, qty in products_to_update:
        product.stock -= qty

    db_order = Order(user_id=user_id, status="paid", total_price=total_price, items=db_order_items)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_user_orders(db: Session, user_id: int):
    return db.query(Order).filter(Order.user_id == user_id).all()

def update_order_status(db: Session, order_id: int, status_val: str):
    order = db.query(Order).filter(Order.id == order_id).first()
    if order:
        # If order is being cancelled, restore the stock and refund credit
        if status_val.lower() == "cancelled" and order.status.lower() != "cancelled":
            for item in order.items:
                product = db.query(Product).filter(Product.id == item.product_id).first()
                if product:
                    product.stock += item.quantity
            user = db.query(User).filter(User.id == order.user_id).first()
            if user:
                user.credit_balance = round(float(user.credit_balance or 0.0) + order.total_price, 2)
        
        order.status = status_val
        db.commit()
        db.refresh(order)
    return order
