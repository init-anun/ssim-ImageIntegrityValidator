# 🧪 Flask Document Forgery Detection Prototype

This directory contains a lightweight, prototype/skeleton [Flask](https://flask.palletsprojects.com/) application for the image integrity validator. It provides a simple routing framework and a landing page template, serving as a minimal implementation for running structural similarity comparisons.

> [!NOTE]
> This Flask application is currently a skeleton prototype. The core POST route in [views.py](file:///home/arun/Documents/code/image-integrity-validator/flask-app/app/views.py#L23-L24) is incomplete. For a fully functioning client-server application, please use the **`fastAPI-react-app/`** directory.

---

## 📁 Directory Structure

```
flask-app/
│
├── app/
│   ├── templates/
│   │   └── index.html   # HTML dashboard frontend template
│   ├── __init__.py      # Flask app factory and configuration selection
│   └── views.py         # HTTP routing and computer vision execution stub
│
├── app.py               # Application execution entrypoint
├── config.py            # Development & Production settings class
└── README.md            # This documentation file
```

---

## 🛠️ Setup & Running instructions

Follow these steps to run the application locally:

### 1. Initialize Virtual Environment
Create a Python virtual environment to isolate the application dependencies:
```bash
# Navigate to this directory
cd flask-app

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
source venv/bin/activate  # On macOS/Linux
# OR
.\venv\Scripts\activate   # On Windows
```

### 2. Install Required Dependencies
Make sure you upgrade pip and install Flask along with the CV2/SSIM modules:
```bash
python -m pip install --upgrade pip
pip install flask opencv-python imutils Pillow scikit-image
```

### 3. Start the Flask Server
Run the application using the entry point script [app.py](file:///home/arun/Documents/code/image-integrity-validator/flask-app/app.py):
```bash
python app.py
```
By default, the server runs on `http://127.0.0.1:5000`.

---

## 🔍 Core Components

* **[app.py](file:///home/arun/Documents/code/image-integrity-validator/flask-app/app.py)**: Imports the configured Flask instance and runs it in debug mode.
* **[app/__init__.py](file:///home/arun/Documents/code/image-integrity-validator/flask-app/app/__init__.py)**: Configures environmental loading (Development, Production, Testing) from [config.py](file:///home/arun/Documents/code/image-integrity-validator/flask-app/config.py).
* **[app/views.py](file:///home/arun/Documents/code/image-integrity-validator/flask-app/app/views.py)**: Includes routing for GET/POST methods at the `/` endpoint. Imports `structural_similarity` from `skimage.metrics` and OpenCV hooks, preparing paths for uploaded/original/generated images.
* **[app/templates/index.html](file:///home/arun/Documents/code/image-integrity-validator/flask-app/app/templates/index.html)**: Simple HTML form interface structure.
