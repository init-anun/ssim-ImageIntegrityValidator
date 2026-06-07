# ⚙️ FastAPI Image Forgery Detection Backend

This directory contains the Python FastAPI backend service responsible for executing structural similarity calculations, processing image layers, generating validation visual grids, and handling database configurations.

---

## 📁 Project Directory Structure

The backend directory follows a modular clean-architecture design pattern:

```
backend/
│
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── api.py            # Aggregates and prefixes routers
│   │       └── routes/
│   │           ├── detection.py  # Route handler for /detect POST requests
│   │           └── user.py       # Route handler for user-related endpoints
│   │
│   ├── core/
│   │   ├── config.py             # Settings configuration via Pydantic-Settings & Dotenv
│   │   └── database.py           # SQLAlchemy SQLite base engine setup
│   │
│   ├── dependencies/
│   │   └── db.py                 # Yields SQLAlchemy database sessions
│   │
│   ├── models/
│   │   └── users.py              # User database model structure
│   │
│   ├── public/
│   │   └── images/
│   │       ├── original/         # Stores temporary uploaded original scans
│   │       ├── tampered/         # Stores temporary uploaded tampered scans
│   │       └── generated/        # Stores CV2 output images (contours/thresholds)
│   │
│   ├── repositories/             # Interface for querying data from SQLAlchemy
│   │
│   ├── schemas/
│   │   ├── detection.py          # Pydantic response models for SSIM scores & files
│   │   └── users.py              # Pydantic schemas for creating/reading users
│   │
│   ├── services/
│   │   └── detection_service.py  # SSIM and OpenCV computer vision pipeline execution
│   │
│   └── main.py                   # FastAPI initialization, middleware configs, and server boot
│
├── documenttampering.db          # Auto-generated SQLite database
├── requirements.txt              # Standard package requirements
└── README.md                     # This documentation file
```

---

## 🔌 API Reference

### 1. Document Tampering Detection
* **Endpoint**: `POST /api/v1/detection/detect`
* **Route Logic**: [detection.py](file:///home/arun/Documents/code/image-integrity-validator/fastAPI-react-app/backend/app/api/v1/routes/detection.py#L22-L25)
* **Request (Multipart Form Data)**:
  * `original_file`: File (Binary image of original document, e.g. `.jpg`, `.png`)
  * `tampered_file`: File (Binary image of suspected tampered document)
* **Response (JSON)**:
  Matches the Pydantic schema [DetectionResponse](file:///home/arun/Documents/code/image-integrity-validator/fastAPI-react-app/backend/app/schemas/detection.py#L10-L14):
  ```json
  {
    "success": true,
    "similarity_score": 98.42,
    "message": "98.42% similarity",
    "generated_files": {
      "original_detected": "data:image/jpeg;base64,...",
      "tampered_detected": "data:image/jpeg;base64,...",
      "difference": "data:image/jpeg;base64,...",
      "threshold": "data:image/jpeg;base64,..."
    }
  }
  ```

---

## 🛠️ Installation & Setup

### 📋 Package Requirements
In addition to the basic list in [requirements.txt](file:///home/arun/Documents/code/image-integrity-validator/fastAPI-react-app/backend/requirements.txt), running the image processing pipeline requires several computer vision libraries.

Ensure you install:
* `fastapi`
* `uvicorn`
* `sqlalchemy`
* `pydantic`
* `pydantic-settings`
* `opencv-python-headless` (or `opencv-python`)
* `imutils`
* `pillow`
* `scikit-image`

### 🚀 Running the App
1. Set up your virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

2. Install the full set of dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic pydantic-settings opencv-python-headless imutils Pillow scikit-image
   ```

3. Run the application directly:
   ```bash
   python -m app.main
   # OR
   uvicorn app.main:app --reload --port 8000
   ```

---

## ⚙️ Core Modules Configuration

* **Environment Variables**: Configure your variables using a `.env` file in the `backend/` directory:
  * `DEBUG` (bool): If `True`, backend uses the local SQLite database. If `False`, it falls back to a PostgreSQL URI constructed from DB configuration variables.
  * `ALLOWED_ORIGINS` (str): Comma-separated list of origins permitted to access this API. For local development, set to `http://localhost:5173`.
* **Database**: Runs SQLite by default, initializing [documenttampering.db](file:///home/arun/Documents/code/image-integrity-validator/fastAPI-react-app/backend/documenttampering.db) at boot, which handles simple tables created in [main.py](file:///home/arun/Documents/code/image-integrity-validator/fastAPI-react-app/backend/app/main.py#L9-L10).
* **CV2 & SSIM logic**: Implemented inside [detection_service.py](file:///home/arun/Documents/code/image-integrity-validator/fastAPI-react-app/backend/app/services/detection_service.py).
