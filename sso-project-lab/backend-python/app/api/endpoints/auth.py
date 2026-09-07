from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.security import verify_password, create_access_token
from app.crud.user import get_user_by_username, create_user
from app.schemas.user import UserCreate, UserResponse
from app.schemas.token import Token

router = APIRouter()

# Local /login and /register endpoints have been REMOVED.
# Authentication MUST happen via the central-auth service (SSO)
# which communicates with FreeRADIUS and issues the JWT token.
