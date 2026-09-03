from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.crud.user import get_user_by_username
from app.schemas.token import TokenData

# auto_error=False: don't reject the request just because there's no Authorization
# header. The SSO cookie (sso_token) is HttpOnly, so the browser sends it
# automatically on same-origin requests but client-side JS can never read it to
# build a Bearer header — the cookie fallback below is how those requests authenticate.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

def get_current_user(request: Request, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not token:
        token = request.cookies.get("sso_token")
    if not token:
        raise credentials_exception
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.ALGORITHM])
        username = payload.get("sub") or payload.get("username")
        role: str = payload.get("role")
        if not role:
            role = "admin" if (username and username.lower().startswith("admin")) else "customer"
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user_by_username(db, username=token_data.username)
    if user is None:
        # Auto-provision the user if they came from SSO
        from app.models.user import User
        user = User(
            username=token_data.username,
            email=f"{token_data.username}@example.com",
            role=role,
            credit_balance=0.0
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        # Sync role from SSO token if needed
        if role and user.role != role:
            user.role = role
            db.commit()
            db.refresh(user)
    return user

def get_current_active_admin(current_user = Depends(get_current_user)):
    if current_user.role != "admin" and not current_user.username.lower().startswith("admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Admin permissions required (Role 'admin' or admin username)"
        )
    return current_user
