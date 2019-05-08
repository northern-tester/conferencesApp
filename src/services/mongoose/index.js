import Promise from 'bluebird'
import mongoose from 'mongoose'
import {mongo} from '../../config'
import path from "path";
import rfs from "rotating-file-stream";
import generateSafeId from 'generate-safe-id';

const logDirectory = path.join(__dirname, 'logs');

Object.keys(mongo.options).forEach((key) => {
  mongoose.set(key, mongo.options[key])
});

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
  let mongoEvent =
    {
      timeStamp: new Date().toISOString(),
      id: generateSafeId(),
      coll: coll,
      method: method,
      query: query,
      doc: doc
    };

let mongoLogStream = rfs('mongo.log', {
  interval: '1d',
  path: logDirectory,

});

console.info({
  mongoEvent: mongoEvent
});

mongoLogStream.on("error", (err) => {
  console.log("RFS error", err);
});

mongoLogStream.write(JSON.stringify(mongoEvent));

});

export default mongoose
