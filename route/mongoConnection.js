/* eslint-disable require-jsdoc */
/**
 * @title MongoDB singleton class
 * @description A singleton class to manage my connection to mongodb
 * @author Nathan Bommezijn
 */

const MongoClient = require('mongodb').MongoClient

/* Disabled ESLINT for this class cuz its trippin */
class Conn {
  static async connectionToMongo() {
      if (this.db) return this.db
      this.db = await MongoClient.connect(this.url, this.options)
      console.log("Connected correctly to mongo server:", process.env.MONGO_DOMAIN);
    return this.db
  }
}

const db = null; //In router you should declare the dbname
const options = {
  useUnifiedTopology: true,
  useNewUrlParser:    true,
};
const url = encodeURI(process.env.M_URL);

module.exports = {
  Conn
}
