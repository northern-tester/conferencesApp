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

mongoose.Promise = Promise
/* istanbul ignore next */
mongoose.Types.ObjectId.prototype.view = function () {
  return {id: this.toString()}
};

/* istanbul ignore next */
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ' + err)
  process.exit(-1)
});

mongoose.set('debug', function (coll, method, query, doc) {
  let set =
    {
      dbQuery: {
        timeStamp: new Date().toISOString(),
        id: generateSafeId(),
        coll: coll,
        method: method,
        query: query,
        doc: doc
      }
    };

  let mongoLogStream = rfs('mongo.log', {
    interval: '1d',
    path: logDirectory,

  });

  mongoLogStream.on("error", (err) => {
    console.log("RFS error", err);
  });

  mongoLogStream.write(JSON.stringify(set));

});

export default mongoose
