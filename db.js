/* eslint-disable require-jsdoc */
// mongodb driver
const MongoClient = require('mongodb').MongoClient;
const dbConnectionUrl = process.env.M_URL;

function initialize(dbName, dbCollectionName, successCallback, failureCallback) {
  MongoClient.connect(dbConnectionUrl, {useUnifiedTopology: true}, function(err, dbInstance) {
    if (err) {
      console.log(`[MongoDB connection] ERROR: ${err}`);
      failureCallback(err); // this should be "caught" by the calling function
    } else {
      const dbObject = dbInstance.db(dbName);
      const dbCollection = dbObject.collection(dbCollectionName);
      console.log('[MongoDB connection] SUCCESS');

      successCallback(dbCollection);
    }
  });
}

module.exports = {
  initialize,
};
