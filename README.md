# 📍 BunkRoute

An interactive campus navigation tool that models a college road network as an undirected, weighted graph over a static campus layout to compute optimal routes and shortest travel distances with support for custom intermediate stops. Fully containerized with Docker for zero-configuration local deployment.

---

## 🚀 Overview

Whether heading to lectures, grabbing a quick bite at the canteen, or finding the fastest way back to the hostel, navigating expansive campus layouts efficiently requires optimal path planning. **BunkRoute** translates real-world campus pathways into an undirected topological graph where:

* **Vertices (Nodes):** Represent major landmarks, department buildings, lecture halls, hostels, canteen hubs, and road intersections.
* **Edges:** Represent actual walking/road segments with associated weights corresponding to real-world distances.

Users can select a starting location, a final destination, and dynamically append multiple intermediate stops to generate the full sequential shortest path and cumulative route distance.

---

## ✨ Features

* **Visual Map & Graph Overlay:** Displays both the reference static campus map and the hand-drawn undirected topological graph schema side by side.
* **Point-to-Point Routing:** Computes the shortest path between any source and destination node.
* **Multi-Stop Waypoints (`+` feature):** Add arbitrary intermediate stops in sequence ($Node_1 \rightarrow Stop_A \rightarrow Stop_B \dots \rightarrow Node_2$).
* **Distance Breakdown:** Outputs the exact segment-by-segment path trajectory along with cumulative distance metrics.
* **Docker Ready:** Fully containerized for fast, consistent local setup across any environment.

---

## 🧠 Algorithmic Approach

1. **Graph Representation:** 
   * Represented as an Adjacency List $G = (V, E)$ with non-negative edge weights $w(u, v) \ge 0$.
2. **Shortest Path Computation:**
   * Uses **Dijkstra's Algorithm** with a Min-Priority Queue for $O((\vert{}V\vert{} + \vert{}E\vert{}) \log \vert{}V\vert{})$ efficiency per segment.
3. **Multi-Stop Sequencing:**
   * Given an ordered list of waypoints $[S_0, S_1, S_2, \dots, S_k]$, the path is constructed by chaining consecutive sub-paths:
   $$\text{Total Distance} = \sum_{i=0}^{k-1} \text{dist}(S_i, S_{i+1})$$

---

## 🛠️ Tech Stack

* **Frontend / UI:** HTML5, CSS3, JavaScript
* **Core Logic / Routing Engine:** C++ / JavaScript
* **Containerization:** Docker, Docker Compose
* **Assets:** Static Campus Layout & Topological Graph Schema

---

## 📁 Repository Structure

```text
BunkRoute/
├── docker-compose.yaml
├── README.md
├── server/
│   ├── Dockerfile
│   ├── graph.js
│   ├── index.js
│   ├── package.json
│   └── utils/
│       └── MinHeap.js
├── bunkRouteclient/
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── README.md
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