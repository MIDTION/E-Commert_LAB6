from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    MYSQL_USER: str = "root"
    MYSQL_PASSWORD: str = "root"
    MYSQL_SERVER: str = "localhost"
    MYSQL_PORT: str = "3306"
    MYSQL_DB: str = "ecom_db"
    
    # Optional direct URL (used by docker-compose)
    DATABASE_URL: Optional[str] = None

    JWT_SECRET: str = "kmitl_chumphon_sso_secret_key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    @property
    def get_database_url(self) -> str:
        if self.DATABASE_URL:
            # SQLAlchemy needs mysql+pymysql instead of just mysql
            if self.DATABASE_URL.startswith("mysql://"):
                return self.DATABASE_URL.replace("mysql://", "mysql+pymysql://")
            return self.DATABASE_URL
        return f"mysql+pymysql://{self.MYSQL_USER}:{self.MYSQL_PASSWORD}@{self.MYSQL_SERVER}:{self.MYSQL_PORT}/{self.MYSQL_DB}"

    class Config:
        env_file = ".env"

settings = Settings()
