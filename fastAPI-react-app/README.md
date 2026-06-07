# ⚡ Full-Stack FastAPI + React Image Integrity Validator

This subdirectory contains the complete, interactive implementation of the Image Integrity Validator. It combines a high-performance **FastAPI backend** (running OpenCV and Scikit-Image calculations) with a modern **React (Vite + TypeScript) frontend** dashboard.

The application allows users to upload an original document template alongside a suspected tampered copy. The backend matches their layouts, computes the Structural Similarity Index (SSIM), draws bounding boxes around anomalies, and returns the result to the frontend for parallel comparison and visual heatmap overlays.

---

## 🏗️ Architecture Overview

```
fastAPI-react-app/
├── backend/    # FastAPI Python web server and CV2 processing logic
└── frontend/   # React Vite TypeScript frontend UI Dashboard
```

* **Frontend**: Initiates requests from [Detection.tsx](file:///home/arun/Documents/code/image-integrity-validator/fastAPI-react-app/frontend/src/pages/Detection.tsx). Files are packaged as a `multipart/form-data` payload and POSTed to `/api/v1/detection/detect` using [DetectionService.ts](file:///home/arun/Documents/code/image-integrity-validator/fastAPI-react-app/frontend/src/services/DetectionService.ts).
* **Backend**: Receives files in [detection.py](file:///home/arun/Documents/code/image-integrity-validator/fastAPI-react-app/backend/app/api/v1/routes/detection.py) and processes them in [detection_service.py](file:///home/arun/Documents/code/image-integrity-validator/fastAPI-react-app/backend/app/services/detection_service.py).
* **Data Flow**:
  1. Frontend submits `original_file` and `tampered_file` to backend.
  2. Backend resizes both to `250x160` and calculates structural similarity.
  3. Backend generates:
     * **Original Processed Image** (with bounding boxes highlighting changed areas).
     * **Tampered Processed Image** (with bounding boxes highlighting changed areas).
     * **Difference Image** (grayscale difference map).
     * **Threshold Image** (binary mask isolating layout differences).
  4. Backend encodes all output images to base64 strings and returns them in a JSON payload.
  5. Frontend renders these base64 images directly inside a grid layout for comparative analysis.

---

## 🚀 Running the Full-Stack Application

### 📋 Prerequisites
Ensure you have the following installed on your machine:
* Python 3.10+
* Node.js 18+ (with `npm`)

---

### Step 1: Start the Backend (FastAPI)

1. Open a new terminal and navigate to the backend directory:
   ```bash
   cd fastAPI-react-app/backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # MacOS/Linux
   # OR
   .\venv\Scripts\activate   # Windows
   ```

3. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   # Ensure dependencies for image processing are installed:
   pip install opencv-python-headless Pillow scikit-image imutils pydantic-settings
   ```

4. Create a `.env` file (optional, default values will be used otherwise):
   ```ini
   DEBUG=True
   ALLOWED_ORIGINS=http://localhost:5173
   ```

5. Launch the FastAPI server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   The API will be available at `http://127.0.0.1:8000` and Swagger docs can be viewed at `http://127.0.0.1:8000/docs`.

---

### Step 2: Start the Frontend (React + Vite)

1. Open a second terminal window and navigate to the frontend directory:
   ```bash
   cd fastAPI-react-app/frontend
   ```

2. Install npm packages:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`. Open this URL in your browser to interact with the application.