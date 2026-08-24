require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { graph, buildUndirectedGraph } = require('./graph');
const MinHeap = require('./utils/MinHeap');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

function dijkstraShortestPath(g, src, dst) {
    const INF = Number.MAX_SAFE_INTEGER;
    const dist = Array(66).fill(INF);
    const path = Array(66).fill(-1);

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
        return { from: src, to: dst, path: [-1], totalDis: -1, message: 'No path found' };
    }

    const resultPath = [];
    for (let current = dst; current !== -1; current = path[current]) {
        resultPath.push(current);
    }
    resultPath.reverse();

    return {
        from: src,
        to: dst,
        path: resultPath,
        totalDis: dist[dst]
    };
}

function buildRouteWithStops(stopNodes) {
    const normalized = stopNodes
        .map((n) => Number.parseInt(n, 10))
        .filter((n) => Number.isInteger(n));

    if (normalized.length < 2) {
        return {
            error: 'At least two stop nodes are required.',
            path: [],
            totalDis: 0
        };
    }

    const g = buildUndirectedGraph(graph);
    let fullPath = [];
    let totalDistance = 0;

    for (let i = 0; i < normalized.length - 1; i += 1) {
        const route = dijkstraShortestPath(g, normalized[i], normalized[i + 1]);

        if (route.path.includes(-1) || route.totalDis === -1) {
            return {
                error: `No route found between ${normalized[i]} and ${normalized[i + 1]}.`,
                path: [],
                totalDis: -1
            };
        }

        if (i === 0) {
            fullPath = [...route.path];
        } else {
            const lastNode = fullPath[fullPath.length - 1];
            const nextStart = route.path[0];

            if (lastNode === nextStart) {
                fullPath = [...fullPath, ...route.path.slice(1)];
            } else {
                fullPath = [...fullPath, ...route.path];
            }
        }

        totalDistance += route.totalDis;
    }

    return {
        from: normalized[0],
        to: normalized[normalized.length - 1],
        path: fullPath,
        totalDis: totalDistance,
        stops: normalized
    };
}

app.get('/', (req, res) => {
    res.send('API Landing Page');
});

app.get('/shortd/:a/:b', (req, res) => {
    const src = Number.parseInt(req.params.a, 10);
    const dst = Number.parseInt(req.params.b, 10);

    if (Number.isNaN(src) || Number.isNaN(dst)) {
        return res.status(400).json({ error: 'Invalid node IDs provided' });
    }

    const result = buildRouteWithStops([src, dst]);
    if (result.error) {
        return res.status(404).json(result);
    }

    return res.json(result);
});

app.post('/route', (req, res) => {
    const rawStops = req.body?.stops;

    if (!Array.isArray(rawStops) || rawStops.length < 2) {
        return res.status(400).json({ error: 'Provide at least two stop nodes.' });
    }

    const result = buildRouteWithStops(rawStops);
    if (result.error) {
        return res.status(404).json(result);
    }

    return res.json(result);
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running in ${NODE_ENV} mode at http://localhost:${PORT}`);
    });
}

module.exports = { app, buildRouteWithStops, dijkstraShortestPath };