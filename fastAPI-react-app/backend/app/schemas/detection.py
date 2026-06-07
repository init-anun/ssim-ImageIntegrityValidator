from pydantic import BaseModel
from typing import Dict

class GeneratedFiles(BaseModel):
    original_detected: str
    tampered_detected: str
    difference: str
    threshold: str

class DetectionResponse(BaseModel):
    success: bool
    similarity_score: float
    message: str
    generated_files: GeneratedFiles

    class Config:
        from_attributes = True