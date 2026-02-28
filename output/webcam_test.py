from roboflow import Roboflow
import cv2
import os
import time
import csv
from datetime import datetime

# ------------------ LOGGING ------------------

LOG_FOLDER = "dashboard"
os.makedirs(LOG_FOLDER, exist_ok=True)

LOG_FILE = os.path.join(LOG_FOLDER, "alerts_log.csv")

def log_intrusion(animal, confidence, image_path):
    file_exists = os.path.isfile(LOG_FILE)
    with open(LOG_FILE, "a", newline="") as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(["timestamp", "animal", "confidence", "image_path"])
        writer.writerow([
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            animal,
            round(confidence, 2),
            image_path
        ])

# ------------------ ROBOFLOW INIT ------------------

rf = Roboflow(api_key="jqjhC0xcf6GKsUSZwF71")
project = rf.workspace().project("animal-intrusin-detection")
model = project.version(4).model   # VERSION 4

# ------------------ WEBCAM SETUP ------------------

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("❌ Error: Could not open webcam")
    exit()

print("✅ Webcam started. Press 'q' to quit.")

# ------------------ FOLDERS ------------------

ANNOTATED_FOLDER = "output_webcam"
ALERT_IMAGE_FOLDER = "webcam_output"

os.makedirs(ANNOTATED_FOLDER, exist_ok=True)
os.makedirs(ALERT_IMAGE_FOLDER, exist_ok=True)

# ------------------ ALERT CONTROL ------------------

CONFIDENCE_THRESHOLD = 0.60
ALERT_COOLDOWN = 30
last_alert_time = 0

frame_count = 0

# ------------------ MAIN LOOP ------------------

while True:
    ret, frame = cap.read()
    if not ret:
        print("❌ Failed to capture frame")
        break

    frame_count += 1
    temp_path = "temp_frame.jpg"
    cv2.imwrite(temp_path, frame)

    prediction = model.predict(
        temp_path,
        confidence=60,
        overlap=30
    )

    predictions = prediction.json().get("predictions", [])

    # Save annotated frame
    annotated_path = os.path.join(
        ANNOTATED_FOLDER, f"frame_{frame_count}.jpg"
    )
    prediction.save(annotated_path)

    annotated_frame = cv2.imread(annotated_path)
    cv2.imshow("Animal Intrusion Detection", annotated_frame)

    # ------------------ LOGGING LOGIC ------------------

    current_time = time.time()

    if predictions and (current_time - last_alert_time > ALERT_COOLDOWN):
        for pred in predictions:
            animal = pred["class"]
            confidence = pred["confidence"]

            if confidence >= CONFIDENCE_THRESHOLD:
                alert_image_path = os.path.join(
                    ALERT_IMAGE_FOLDER,
                    f"{animal}_{int(current_time)}.jpg"
                )

                cv2.imwrite(alert_image_path, frame)

                log_intrusion(animal, confidence, alert_image_path)

                print(f"🚨 LOGGED: {animal} ({confidence:.2f})")

                last_alert_time = current_time
                break

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# ------------------ CLEANUP ------------------

cap.release()
cv2.destroyAllWindows()
print("🛑 Webcam detection ended")
