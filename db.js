/**
 * @file mongoDB export
 * @description NOT MY OWN CODE, after searching for many examples, ended up using this and mostly copying it.
 * It does feel bad, but I want to atleast CRUD. Did extend code for my use.
 * Sadly now am initializing a new db connection for each route.
 * {@link dbFile}
 * @source https://dev.to/lenmorld/rest-api-with-mongodb-atlas-cloud-node-and-express-in-10-minutes-2ii1
 * @author Nathan Bommezijn
 */

/* eslint-disable max-len */
// require mongoClient && bind .env variable
const MongoClient = require('mongodb').MongoClient;
const dbConnectionUrl = process.env.M_URL;

/**
 *
 * @title Initilialization to reuse mongodb connection.
 * {@link https://dev.to/lenmorld/rest-api-with-mongodb-atlas-cloud-node-and-express-in-10-minutes-2ii1|dev.to lenmorld tutorial}
 * @param {*} dbName - name of database within MongoDB
 * @param {*} dbCollectionName - name of collection within MongoDB
 * @param {*} successCallback - returns all in a cursor (is an iterator where you can do next, hasNext()).
 * But is converted to (async) array for ease of use. in console returns all
 * @param {*} failureCallback - Return error if connection cannot be made
 * Reason why callbacks are used instaed of promises (ES6) or even async await (ES7) as of time the tutorial was written MongoClient.connect only supported callbacks
 * If I had more knowledge about callbacks, promises, async Await, I would've tried to refactor underlying module.
 */
function initialize(dbName, dbCollectionName, successCallback, failureCallback) {
  MongoClient.connect(dbConnectionUrl, {useUnifiedTopology: true}, function(err, dbInstance) {
    if (err) {
      console.log(`[MongoDB connection] ERROR: ${err}`);
      failureCallback(err); // this should be "caught" by the calling function
    } else {
      const dbObject = dbInstance.db(dbName);
      const dbCollection = dbObject.collection(dbCollectionName);
      console.log('[MongoDB connection] SUCCESS🎉');
      successCallback(dbCollection); // If I change this, it returns broken af. && when commented out stuck on load
    }
  });
}

module.exports = {
  initialize,
};
