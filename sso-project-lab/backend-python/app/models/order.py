from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String(50), default="pending") # pending, paid, shipped, completed, cancelled
    total_price = Column(Float, default=0.0)

    owner = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, default=1)
    price = Column(Float, nullable=False) # Price at the time of purchase
    # snapshot of the game credential handed out at purchase time, so it stays
    # correct even if the admin edits/deletes the product listing afterwards
    credential_username = Column(String(100), nullable=True)
    credential_password = Column(String(100), nullable=True)

    order = relationship("Order", back_populates="items")
    product = relationship("Product")

    @property
    def product_name(self):
        return self.product.name if self.product else None

    @property
    def product_image(self):
        return self.product.image if self.product else None
