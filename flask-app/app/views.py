from app import app
from flask import request, render_template
import os
from skimage.metrics import structural_similarity
import imutils
import cv2
from PIL import Image

# Adding path to config
app.config['INITIAL_FILE_UPLOADS'] = 'app/static/uploads'
app.config['EXISTING_FILE'] = 'app/static/original'
app.config['GENERATED_FILE'] = 'app/static/generated'

# Route to Home Page
@app.route('/', methods=['GET', 'POST'])
def index():

    # Execute if request is get
    if request.method == 'GET':
        return render_template('index.html')

    # Execute if request is post
    if request.method == 'POST':
        return 

if __name__ == '__main__':
    app.run(debug=True)
