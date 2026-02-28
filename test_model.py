from roboflow import Roboflow
import os
import cv2

# 1️⃣ Initialize Roboflow
rf = Roboflow(api_key="jqjhC0xcf6GKsUSZwF71")
project = rf.workspace().project("animal-intrusin-detection")
model = project.version(4).model   # ✅ VERSION 4

# 2️⃣ Folders
TEST_FOLDER = "test_images"
OUTPUT_FOLDER = "output"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# 3️⃣ Run inference on all test images
for img_name in os.listdir(TEST_FOLDER):
    if img_name.lower().endswith((".jpg", ".jpeg", ".png")):
        img_path = os.path.join(TEST_FOLDER, img_name)
        print(f"🔍 Processing {img_name}...")

        # Run prediction
        prediction = model.predict(
            img_path,
            confidence=60,
            overlap=30
        )

        # Save annotated image
        annotated_path = os.path.join(OUTPUT_FOLDER, img_name)
        prediction.save(annotated_path)
        print(f"✅ Saved → {annotated_path}")

print("🎉 All images processed using Model Version 4!")

