implementation of image integrity validator web app

### Image Integrity Validator
The Image Integrity Validator is an automated computer vision framework designed to perform digital forensics and forgery detection on image documents such as Permanent Account Number (PAN) cards. The system ingests user-submitted document images and executes a multi-stage validation pipeline, utilizing structural layout analysis, Optical Character Recognition (OCR) text alignment checking, and error level analysis (ELA) to isolate pixel-level anomalies, font disparities, and compression artifacts. By processing these geometric and statistical features, the model computes a tampering probability score, enabling automated verification of document authenticity and integrity at scale.

For this project we will calculate the structural similarity of an original image and a tampered image.