from dotenv import load_dotenv
from os import getenv

from typing import List
from pydantic_settings import BaseSettings
from pydantic import field_validator
load_dotenv()

class Settings(BaseSettings):

    PROJECT_NAME: str = "Document Tampering Detection API"
    
    DEBUG: bool = True

    API_PREFIX: str = "/api/v1"

    DATABASE_URL: str = "sqlite:///./documenttampering.db"
        
    SECRET_KEY: str = "your_secret_key_here"
    
    
    ALLOWED_ORIGINS:str = getenv("ALLOWED_ORIGINS")


    def __init__(self, **values):
        super().__init__(**values)
        if not self.DEBUG:
            db_user = getenv("DB_USER")
            db_password = getenv("DB_PASSWORD")
            db_host = getenv("DB_HOST")
            db_port = getenv("DB_PORT")
            db_name = getenv("DB_NAME")
            self.DATABASE_URL = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"




    @field_validator("ALLOWED_ORIGINS")
    def parse_allowed_origins(cls, v: str) -> List[str]:
        return v.split(",") if v else []

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()