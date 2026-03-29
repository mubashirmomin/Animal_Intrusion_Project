# Animal Intrusion Monitor — Frontend

React + Vite frontend for the Animal Intrusion Detection System.

## Stack
- **React 18** + **React Router v6**
- **Vite** (dev server with proxy to Spring Boot)
- **Axios** for API calls
- **Lucide React** for icons
- Fonts: Syne (display) · DM Sans (body) · DM Mono (mono)

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` and proxies `/api/*` to `http://localhost:8080`.

## Environment

Create a `.env` file at the root to override the backend URL:

```
VITE_API_URL=http://localhost:8080
```

## Pages

| Route        | Page        | Description                              |
|--------------|-------------|------------------------------------------|
| `/`          | Home        | Upload image → run detection             |
| `/dashboard` | Dashboard   | Stats, bar chart, recent detections      |
| `/history`   | History     | Full table of all DB records + filtering |

## API endpoints used

| Method | Endpoint                  | Used in            |
|--------|---------------------------|--------------------|
| POST   | `/api/detection`          | UploadForm         |
| GET    | `/api/detection/history`  | Dashboard, History |

## Adding Raspberry Pi live feed

Open `src/components/Camera/LiveFeed.jsx` and set `STREAM_URL` to your Pi's MJPEG endpoint:

```js
const STREAM_URL = 'http://192.168.1.x:8080/stream.mjpg'
```

## Project structure

```
src/
├── components/
│   ├── Upload/         # UploadForm + ResultCard
│   ├── Detection/      # DetectionTable + DetectionRow
│   ├── Camera/         # LiveFeed (Raspberry Pi, future)
│   └── UI/             # Navbar + Loader
├── pages/              # Home, Dashboard, History
├── services/api.js     # All Axios calls
├── hooks/useDetection.js
├── utils/formatDate.js
├── App.jsx
└── main.jsx
```
