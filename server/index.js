require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { graph, buildUndirectedGraph } = require('./graph');
const MinHeap = require('./utils/MinHeap');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors({ origin: FRONTEND_URL}));

app.get('/', (req, res) => {
    res.send('API Landing Page');
});

app.get('/shortd/:a/:b', (req, res) => {
    const src = parseInt(req.params.a);
    const dst = parseInt(req.params.b);

    if (isNaN(src) || isNaN(dst)) {
        return res.status(400).json({ error: 'Invalid node IDs provided' });
    }

    const g = buildUndirectedGraph(graph);

    const INF = Number.MAX_SAFE_INTEGER;
    const n = 65;
    const dist = Array(n + 1).fill(INF);
    const path = Array(n + 1).fill(-1);
    dist[src] = 0;

    const heap = new MinHeap();
    heap.push([0, src]);

    while (!heap.isEmpty()) {
        const [d, u] = heap.pop();
        if (d > dist[u]) continue;

        for (const [v, w] of g[u] || []) {
        if (d + w < dist[v]) {
            dist[v] = d + w;
            path[v] = u;
            heap.push([dist[v], v]);
        }
        }
    }

    if (dist[dst] === INF) {
        return res.status(404).json({
        from: src,
        to: dst,
        path: [-1],
        totalDis: -1,
        message: 'No path found'
        });
    }

    const resultPath = [];
    for (let current = dst; current !== -1; current = path[current]) {
        resultPath.push(current);
    }
    resultPath.reverse();

    res.json({
        from: src,
        to: dst,
        path: resultPath,
        totalDis: dist[dst]
    });
});

app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode at http://localhost:${PORT}`);
});