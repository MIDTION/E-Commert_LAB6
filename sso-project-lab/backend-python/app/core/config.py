from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MYSQL_USER: str = "root"
    MYSQL_PASSWORD: str = "root"
    MYSQL_SERVER: str = "localhost"
    MYSQL_PORT: str = "3306"
    MYSQL_DB: str = "ecom_db"

    SECRET_KEY: str = "supersecretkey"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    @property
    def DATABASE_URL(self) -> str:
        # Using pymysql as the driver for MySQL
        return f"mysql+pymysql://{self.MYSQL_USER}:{self.MYSQL_PASSWORD}@{self.MYSQL_SERVER}:{self.MYSQL_PORT}/{self.MYSQL_DB}"

    class Config:
        env_file = ".env"

settings = Settings()
