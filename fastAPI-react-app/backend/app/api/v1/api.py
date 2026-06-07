from fastapi import APIRouter
from app.api.v1.routes import user
from app.api.v1.routes import detection

router = APIRouter()

router.include_router(user.router)
router.include_router(detection.router)