# 🐾 Animal Intrusion Detection System (AI + IoT + Full Stack)

A real-time intelligent surveillance system that detects animal intrusion using **IoT motion sensing, AI image detection, and full-stack web integration**, and sends instant alerts via Telegram.

---

## 🚀 Key Highlights

* 📡 **IoT Motion Detection (ESP32 + PIR Sensor)**
* ⚡ **Real-time event-driven workflow**
* 🎥 **Auto camera activation (React + getUserMedia)**
* 🤖 **AI-based detection using Roboflow API**
* 📊 **Confidence-based filtering to reduce false positives**
* 🗄️ **Detection history stored in MySQL**
* 📱 **Instant Telegram alerts**
* 🔁 **Frontend–Backend synchronization via polling**

---

## 🧠 System Architecture

Motion detection triggers a complete pipeline:

```
ESP32 (PIR Sensor)
        ↓
POST /api/motion
        ↓
Spring Boot Backend (flag update)
        ↓
Frontend Polling (/api/motion/status)
        ↓
Camera Activation (getUserMedia)
        ↓
Image Capture (Canvas)
        ↓
POST /api/detection
        ↓
AI Detection (Roboflow API)
        ↓
Database + Telegram Alert
```

---

## ⚙️ How It Works

### 1️⃣ IoT Layer (ESP32)

* PIR sensor detects motion
* ESP32 sends HTTP POST request to backend:

```
POST /api/motion
```

---

### 2️⃣ Backend Layer (Spring Boot)

* Layered architecture:

  ```
  Controller → Service → Repository
  ```
* Handles:

  * Motion state management
  * Image processing
  * AI API integration
  * Telegram alerts

#### Key APIs:

* `/api/motion` → triggered by ESP32
* `/api/motion/status` → used by frontend polling
* `/api/detection` → image upload & AI detection

---

### 3️⃣ Frontend Layer (React)

* Polls backend continuously
* On motion detection:

  * Activates camera using `getUserMedia()`
  * Captures image via `<canvas>`
  * Sends image to backend

---

### 4️⃣ AI Detection Layer

* Image sent to **Roboflow API** (Base64 encoded)
* Returns:

  * Animal class
  * Confidence score
* Backend filters low-confidence results

---

## 📡 API Endpoints

### 🔹 POST `/api/motion`

Triggered by ESP32 when motion is detected

---

### 🔹 GET `/api/motion/status`

Returns motion flag for frontend polling

```json
{
  "motion": true
}
```

---

### 🔹 POST `/api/detection`

Upload captured image

```json
{
  "animal": "Tiger",
  "confidence": 0.91,
  "detected": true
}
```

---

### 🔹 GET `/api/detection`

Fetch detection history

---

## 🛠️ Tech Stack

### 🔹 IoT

* ESP32
* PIR Motion Sensor

### 🔹 Frontend

* React (Vite)
* JavaScript
* Axios
* Web APIs (getUserMedia, Canvas)

### 🔹 Backend

* Spring Boot (Java)
* REST APIs
* JPA / Hibernate

### 🔹 Database

* MySQL

### 🔹 Integrations

* Roboflow API (AI Detection)
* Telegram Bot API

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

roboflow.api.key=YOUR_API_KEY
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📱 Telegram Alerts

```
🚨 Animal Alert!

🐾 Animal: Tiger
📊 Confidence: 91%
⏰ Time: 05:10 PM
```

---

## ⚡ Engineering Challenges Solved

* 🔄 Synchronizing frontend polling with backend state
* ⚙️ Handling async camera initialization (React)
* 🧠 Preventing race conditions using refs & cooldown logic
* 🌐 Integrating external AI APIs (Roboflow)
* 🎯 Filtering low-confidence predictions

---

## 🔮 Future Improvements

* 📷 Raspberry Pi live camera integration
* 🖼️ Send captured image in Telegram alerts
* 🔐 Authentication (JWT / Spring Security)
* 🐳 Docker + AWS deployment
* ⚡ Replace polling with WebSockets

---

## 👨‍💻 Author

Built as a **real-time AI + IoT system** demonstrating:

* Full-stack development
* System design thinking
* Event-driven architecture
* External API integration

---

## ⭐ Contributions

Open to improvements, suggestions, and collaborations!
