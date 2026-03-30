# 🐾 Animal Intrusion Detection System

A full-stack application that detects animals from images and sends real-time alerts via Telegram.
Designed as a foundation for smart surveillance systems using AI and IoT (Raspberry Pi ready).

---

## 🚀 Features

* 📤 Upload image for detection
* 🤖 AI-based animal detection (currently simulated)
* 🐘 Detects animals like Elephant, Tiger, Leopard, Wild Boar, etc.
* 📊 Displays detection results with confidence score
* 🗄️ Stores detection history in MySQL
* 📱 Sends real-time alerts via Telegram Bot
* 📜 View past detection records (History page)

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* JavaScript (ES6+)
* Axios
* Custom Hooks (useDetection, useHistory)

### Backend

* Spring Boot (Java)
* REST APIs
* Layered Architecture (Controller → Service → Repository)

### Database

* MySQL
* JPA / Hibernate

### Integrations

* Telegram Bot API
* File Upload (MultipartFile)

---

## 📁 Project Structure

### Frontend

```
src/
├── components/
│   ├── Upload/
│   ├── Detection/
│   ├── UI/
├── hooks/
│   ├── useDetection.js
│   ├── useHistory.js
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── History.jsx
├── services/
│   └── api.js
```

### Backend

```
controller/        → DetectionController
service/           → Business logic
service/impl/      → Implementations
entity/            → Detection entity
repo/              → JPA repository
dto/               → AIDetectionResponse
```

---

## ⚙️ How It Works

1. User uploads an image from the frontend
2. Image is sent to backend (`POST /api/detection`)
3. Backend:

   * Saves image locally
   * Runs AI detection (mocked for now)
   * Stores result in database
   * Sends Telegram alert (if animal detected)
4. Response is returned and displayed in UI

---

## 📡 API Endpoints

### 🔹 POST `/api/detection`

Upload image for detection

**Request:**

* Multipart file

**Response:**

```json
{
  "animal": "Tiger",
  "confidence": 0.91,
  "detected": true
}
```

---

### 🔹 GET `/api/detection`

Fetch all detection records

```json
[
  {
    "id": 1,
    "animalType": "Tiger",
    "confidence": 0.91,
    "imagePath": "...",
    "detectedAt": "timestamp"
  }
]
```

---

## 🧪 Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/mubashirmomin/Animal_Intrusion_Project.git
cd Animal_Intrusion_Project
```

---

### 2️⃣ Backend Setup

```bash
cd backend
mvn spring-boot:run
```

#### Configure `application.properties`

```
spring.datasource.url=jdbc:mysql://localhost:3306/animal_intrusion_db
spring.datasource.username=root
spring.datasource.password=your_password

telegram.bot.token=YOUR_BOT_TOKEN
telegram.chat.id=YOUR_CHAT_ID
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### 4️⃣ Access App

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:8080
```

---

## 📱 Telegram Alerts

When an animal is detected, a message is sent:

```
🚨 Animal Alert!

🐾 Animal: Tiger
📊 Confidence: 91%
⏰ Time: 05:10 PM
```

---

## ⚠️ Common Issues

* **CORS Error** → Add `@CrossOrigin` in controller
* **Network Error** → Ensure backend is running
* **Vite not found** → Run `npm install`
* **Telegram not working** → Check bot token & chat ID

---

## 🔮 Future Improvements

* 🔥 Integrate real AI model (YOLO / Python API)
* 📷 Raspberry Pi camera integration (live feed)
* 🖼️ Send captured image in Telegram alert
* 🌐 Deploy using Docker + AWS + NGINX
* 🔐 Add authentication (JWT / Spring Security)
* 🚨 Severity-based alerts (Tiger = high risk)

---

## 👨‍💻 Author

Built as a full-stack AI + IoT project demonstrating:

* Backend development (Spring Boot)
* Frontend integration (React)
* Real-time alert systems
* System design thinking

---

## ⭐ Contribution / Feedback

Feel free to fork, improve, and suggest ideas!

---
