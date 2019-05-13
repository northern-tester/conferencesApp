import {Router} from 'express'
import {register} from "prom-client";
const Prometheus = require('prom-client');

const router = new Router();

const intervalCollector = Prometheus.collectDefaultMetrics({prefix: 'conferences_', timeout: 5000, register});

const histogram = new Prometheus.Histogram({
  name: 'conferences_http_duration',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'status_code'],
  buckets: [0.1, 5, 15, 50, 100, 500]
});

register.registerMetric(histogram);

router.get('/', function (req, res) {
  const end = histogram.startTimer();
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
  end({ method: req.method, 'status_code': 200 });
});

export default router
