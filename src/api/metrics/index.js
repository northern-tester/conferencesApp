import {Router} from 'express'
import {register} from "prom-client";

const Prometheus = require('prom-client');

const router = new Router();

const intervalCollector = Prometheus.collectDefaultMetrics({prefix: 'metrics_', timeout: 5000, register});

const histogram = new Prometheus.Histogram({
  name: 'metrics_http_duration',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'status_code'],
  buckets: [500, 1000]
});

const counter = new Prometheus.Counter({
  name: 'metrics_http_throughput',
  help: 'Number of http requests on the metrics endpoint',
});

register.registerMetric(histogram);
register.registerMetric(counter);

router.use((req, res, next) => {
  counter.inc();
  next()
});

router.get('/', function (req, res) {
  const end = histogram.startTimer();
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
  end({method: req.method, status_code: res.statusCode});
});

export default router;
