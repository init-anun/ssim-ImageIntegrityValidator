from fastapi import FastAPI
from app.api.v1.api import router
from app.core.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
import logging


# create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Image Integrity Validator API",
    description="An API for detecting image tampering using machine learning models.",
    version="1.0.0",
    docs_url='/docs',
    redoc_url='/redoc')

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print(f"Allowed origins: {settings.ALLOWED_ORIGINS}")


@app.on_event("startup")
async def log_startup():
    logging.info("Server is running and ready at http://127.0.0.1:8000")


app.include_router(router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8009, reload=True)