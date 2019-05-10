import Promise from 'bluebird'
import mongoose from 'mongoose'
import {mongo} from '../../config'
import generateSafeId from 'generate-safe-id';

Object.keys(mongo.options).forEach((key) => {
  mongoose.set(key, mongo.options[key])
});

const json = require('morgan-json');

mongoose.Promise = Promise;

/* istanbul ignore next */
mongoose.Types.ObjectId.prototype.view = function () {
  return {id: this.toString()}
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDBConnectionError: ' + err);
  process.exit(-1)
});

mongoose.set('debug', function (coll, method, query, doc) {
  let mongoEvent = {
    timeStamp: new Date().toISOString(),
    id: generateSafeId(),
    coll: coll,
    method: method,
    query: query,
    doc: doc
  };

  console.info({
    mongoEvent: mongoEvent
  });
});

export default mongoose
