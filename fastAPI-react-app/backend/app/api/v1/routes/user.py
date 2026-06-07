from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.users import UserCreate, UserResponse
# from app.models.users import User
from app.dependencies.db import get_db
from app.repositories.user_repository import UserRepository
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["Users"])

def get_service(db: Session = Depends(get_db)):
    repo = UserRepository(db)
    return UserService(repo)

@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, service: UserService = Depends(get_service)):
    return service.create_user(user)

@router.get("/", response_model=list[UserResponse])
def get_users(service: UserService = Depends(get_service)):
    return service.get_all_users()

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, service: UserService = Depends(get_service)):
    return service.get_user_by_id(user_id)