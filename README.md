# 📍 BunkRoute

BunkRoute is a campus navigation app that models the IIT Guwahati-style road network as an undirected weighted graph and finds the shortest route between locations. The app supports both direct travel and multi-stop routing with dynamic stop creation using the + and − controls.

---

## 🚀 Overview

The project is split into two main parts:

- a Node.js backend that computes shortest paths using Dijkstra's algorithm
- a Vite + React frontend that lets the user input source, destination, and any number of intermediate stops

This makes it easy to navigate between landmarks, departments, hostels, and other campus points while accounting for intermediate stops in sequence.

---

## ✨ Features

- Dynamic route input with start and end nodes
- Add intermediate stops with the + button
- Remove stops with the − button
- Multi-stop path planning across consecutive node pairs
- Total cumulative distance calculation
- Visual campus map display in the frontend
- Backend API for shortest route requests
- Docker Compose setup for local deployment

---

## 🧠 Algorithmic Approach

1. Graph Representation
   - The network is stored as an adjacency-list graph with non-negative edge weights.
2. Shortest Path Computation
   - Each segment is solved using Dijkstra's algorithm with a min-heap priority queue.
3. Multi-Stop Sequencing
   - For an ordered list of stops $[S_0, S_1, S_2, \dots, S_k]$, the app computes:
   $$\text{Total Distance} = \sum_{i=0}^{k-1} \text{dist}(S_i, S_{i+1})$$
   - The final route is the concatenation of the shortest paths between consecutive stops.

---

## 🛠️ Tech Stack

- Frontend: React, Vite, JavaScript
- Backend: Node.js, Express
- Routing: Dijkstra's shortest path algorithm
- Containerization: Docker, Docker Compose
- Styling: CSS, Tailwind-inspired utility classes

---

## 📁 Repository Structure

```text
BunkRoute/
├── docker-compose.yaml
├── README.md
├── server/
│   ├── Dockerfile
│   ├── .env
│   ├── graph.js
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── utils/
│       └── MinHeap.js
├── bunkRouteclient/
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── public/
│   │   ├── favicon.png
│   │   └── maps/
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       └── components/
│           ├── MapViewer.jsx
│           └── Modal.jsx
└── .git/
```

---

## ▶️ Run Locally

### Backend

```bash
cd C:\Vighnu\Coding\_repos\BunkRoute\server
npm install
node index.js
```

The server starts on:

```text
http://localhost:3000
```

### Frontend

```bash
cd C:\Vighnu\Coding\_repos\BunkRoute\bunkRouteclient
npm install
npm run dev
```

Open the app at:

```text
http://localhost:5173
```

---

## API

### POST /route

Send a JSON body like:

```json
{
  "stops": [12, 18, 42, 9]
}
```

Example response:

```json
{
  "from": 12,
  "to": 9,
  "path": [12, 13, 14, 15, 16, 18, 42, 9],
  "totalDis": 786,
  "stops": [12, 18, 42, 9]
}
```

---

## Docker

From the project root:

```bash
docker compose up --build
```

This runs both the API and the frontend together.

---

## Project Notes

- The frontend and server are intentionally separated for clean API-based routing.
- The route computation is based on campus node graph data stored in the backend.
- The UI supports flexible intermediate waypoints using + and − controls for route editing.