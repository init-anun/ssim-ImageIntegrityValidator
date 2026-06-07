# Steps to run the app

python -m venv venv_name

./venv_name\scripts\activate ----> activate virtual venv

python -m pip install --upgrade pip
python -m pip install flask
python -m flask --app .\app.py run


python app.py



## Project Structure and Architecture

my_flask_app/
│
├── app/
│   ├── __init__.py
│   ├── config.py
│   │
│   ├── models/
│   │   └── user.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   └── main.py
│   │
│   ├── services/
│   │   └── user_service.py
│   │
│   ├── templates/
│   └── static/
│
├── migrations/
├── tests/
├── .env
├── requirements.txt
├── run.py
└── wsgi.py


