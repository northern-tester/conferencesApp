import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import generateSafeId from 'generate-safe-id'
import {errorHandler as queryErrorHandler} from 'querymen'
import {errorHandler as bodyErrorHandler} from 'bodymen'
import {env} from '../../config'

export default (apiRoot, routes) => {

  const app = express();
  const json = require('morgan-json');
  const eventLookup = require('./eventLookup');
  const apiMetrics = require('prometheus-api-metrics');

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors());
    app.use(compression())
  }

  morgan.token('id', function getId() {
    return generateSafeId()
  });

  morgan.token('eventName', function getEventName(req, res) {
    return eventLookup.setEventName(req.originalUrl, req.method, res.statusCode);
  });

  const format = json({
    summary: '[:date[clf]] :id :eventName :method :url :status',
    response: ':res[content-length]',
    'response-time': ':response-time ms'
  });

  app.use(apiMetrics({
    metricsPrefix: 'api_metrics',
    durationBuckets: [0.001, 0.005, 0.015, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5],
    requestSizeBuckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
    responseSizeBuckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
  }));

  app.use(morgan(format));

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(apiRoot, routes);
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());

  return app
}
