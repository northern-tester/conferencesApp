import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import rfs from 'rotating-file-stream'
import bodyParser from 'body-parser'
import path from 'path'
import generateSafeId from 'generate-safe-id'
import {errorHandler as queryErrorHandler} from 'querymen'
import {errorHandler as bodyErrorHandler} from 'bodymen'
import {env} from '../../config'

export default (apiRoot, routes) => {

  const app = express();
  const logDirectory = path.join(__dirname, 'logs');
  const eventLookup = require('./eventLookup');
  let accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
  });

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
  }

  app.use(morgan('dev', {
    skip: function (req, res) {
      return res.statusCode < 400
    }
  }));

  app.use(morgan(function (tokens, req, res) {
    return `{ '${eventLookup.setEventName(req.originalUrl, req.method)}' : 'timestamp': '${new Date().toISOString()}', 'id': '${generateSafeId()}', 'url' : '${req.originalUrl}', 'status' : '${res.statusCode}', 'method' : '${req.method} }`;
  }, {stream: accessLogStream}));

  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())


  return app
}
