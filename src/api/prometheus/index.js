import {Router} from 'express'

const Prometheus = require('prom-client');

const router = new Router();

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['route'],
  // buckets for response time from 0.1ms to 500ms
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
});

// After each response
httpRequestDurationMicroseconds
  .labels(req.route.path)
  .observe(responseTimeInMs);

// Metrics endpoint
router.get('/metrics', (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics())
});

export default router
