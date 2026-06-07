from fastapi import APIRouter, Depends, File, UploadFile, Request
from sqlalchemy.orm import Session

from app.schemas.detection import DetectionResponse
from app.dependencies.db import get_db
from app.services.detection_service import DetectionService


# from app.schemas.users import UserCreate, UserResponse
# from app.dependencies.db import get_db
# from app.repositories.user_repository import UserRepository
# from app.services.user_service import UserService

router = APIRouter(prefix="/detection", tags=["detection"])

detection_service = DetectionService()

# @router.get("/"):
#     return {"message": "Detection endpoint is working 🚀"}


@router.post("/detect", response_model=DetectionResponse)
async def detect_tampering(original_file: UploadFile = File(...), tampered_file: UploadFile = File(...)):
    result = await detection_service.detect_tampering(original_file, tampered_file)
    return DetectionResponse(**result)


# def get_service(db: Session = Depends(get_db)):
#     repo = UserRepository(db)
#     return UserService(repo)

# @router.post("/", response_model=UserResponse)
# def create_user(user: UserCreate, service: UserService = Depends(get_service)):
#     return service.create_user(user)

# @router.get("/", response_model=list[UserResponse])
# def get_users(service: UserService = Depends(get_service)):
#     return service.get_users()

# @router.get("/{user_id}", response_model=UserResponse)
# def get_user(user_id: int, service: UserService = Depends(get_service)):
#     return service.get_user(user_id)