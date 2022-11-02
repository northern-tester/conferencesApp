import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import generateSafeId from 'generate-safe-id'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'

export default (apiRoot, routes) => {
  const app = express()
  const apiMetrics = require('prometheus-api-metrics');


  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
  }

  morgan.token('id', function getId() {
    return generateSafeId();
  });

  morgan.format('performance', '[:date[clf]] :id “Operation :method :url :status” "Content Length :res[content-length]" "Cache :req[Cache-Control]" "Response Time :response-time" ":user-agent"')

  app.use(apiMetrics({
    metricsPrefix: 'api_metrics',
    durationBuckets: [0.001, 0.005, 0.015, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5],
    requestSizeBuckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
    responseSizeBuckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
  }));

  app.use(morgan('performance'))

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
