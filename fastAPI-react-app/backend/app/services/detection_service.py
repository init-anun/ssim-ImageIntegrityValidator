# from app.models.users import User
# from app.repositories.user_repository import UserRepository

# class UserService:
#     def __init__(self, user_repository: UserRepository):
#         self.user_repository = user_repository

#     def create_user(self, user: User) -> User:
#         return self.user_repository.create_user(user)

#     def get_all_users(self) -> list[User]:
#         return self.user_repository.get_all()

#     def get_user_by_id(self, user_id: int) -> User:
#         return self.user_repository.get_user_by_id(user_id)


# ........................................................................................





import os
import cv2
import imutils

from PIL import Image
from fastapi import UploadFile
from skimage.metrics import structural_similarity

import base64



class DetectionService:

    async def detect_tampering( self, original_file: UploadFile, tampered_file: UploadFile
    ) -> dict:

        # Create folders
        ORIGINAL_DIR = "app/public/images/original"
        TAMPERED_DIR = "app/public/images/tampered"
        GENERATED_DIR = "app/public/images/generated"

        os.makedirs(ORIGINAL_DIR, exist_ok=True)
        os.makedirs(TAMPERED_DIR, exist_ok=True)
        os.makedirs(GENERATED_DIR, exist_ok=True)

        print("Folders created successfully.")

        # File paths
        original_path = os.path.join(ORIGINAL_DIR, "original.jpg")
        tampered_path = os.path.join(TAMPERED_DIR, "tampered.jpg")

        
        
        # Save original image
        original_contents = await original_file.read()

        with open(original_path, "wb") as f:
            f.write(original_contents)

        # Save tampered image
        tampered_contents = await tampered_file.read()

        with open(tampered_path, "wb") as f:
            f.write(tampered_contents)

        print("Files saved successfully.")

        # Resize both images
        original_pil = Image.open(original_path).resize((250, 160))
        tampered_pil = Image.open(tampered_path).resize((250, 160))

        original_pil.save(original_path)
        tampered_pil.save(tampered_path)

        # Read images using OpenCV
        original_image = cv2.imread(original_path)
        tampered_image = cv2.imread(tampered_path)

        # Convert to grayscale
        original_gray = cv2.cvtColor( original_image, cv2.COLOR_BGR2GRAY )

        tampered_gray = cv2.cvtColor( tampered_image, cv2.COLOR_BGR2GRAY )

        # Compare images using SSIM
        (score, diff) = structural_similarity( original_gray, tampered_gray, full=True )

        # Convert diff image
        diff = (diff * 255).astype("uint8")

        # Threshold
        thresh = cv2.threshold( diff, 0, 255,
            cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU
        )[1]

        # Find contours
        cnts = cv2.findContours( thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE )

        cnts = imutils.grab_contours(cnts)

        # Draw rectangles around differences
        for c in cnts:

            (x, y, w, h) = cv2.boundingRect(c)

            cv2.rectangle(
                original_image,
                (x, y),
                (x + w, y + h),
                (0, 0, 255),
                2
            )

            cv2.rectangle(
                tampered_image,
                (x, y),
                (x + w, y + h),
                (0, 0, 255),
                2
            )

        # Output paths
        original_output = os.path.join( GENERATED_DIR,"original_detected.jpg" )

        tampered_output = os.path.join( GENERATED_DIR, "tampered_detected.jpg")

        diff_output = os.path.join( GENERATED_DIR, "difference.jpg" )

        thresh_output = os.path.join( GENERATED_DIR, "threshold.jpg" )

        # Save results
        cv2.imwrite(original_output, original_image)
        cv2.imwrite(tampered_output, tampered_image)
        cv2.imwrite(diff_output, diff)
        cv2.imwrite(thresh_output, thresh)

        return {
            "success": True,
            "similarity_score": round(score * 100, 2),
            "message": f"{round(score * 100, 2)}% similarity",
            "generated_files": {
                "original_detected": self.encode_image_to_base64(original_output),
                "tampered_detected": self.encode_image_to_base64(tampered_output),
                "difference": self.encode_image_to_base64(diff_output),
                "threshold": self.encode_image_to_base64(thresh_output)
            }
        }
    
    def encode_image_to_base64(self, image_path: str) -> str:
        with open(image_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
        return encoded_string