/* eslint-disable require-jsdoc */
/**
 * @title MongoDB singleton class
 * @description A singleton class to manage my connection to mongodb
 * @author Nathan Bommezijn
 */

const {  MongoClient } = require('mongodb');


/* Disabled ESLINT for this class cuz its trippin */
class Conn {
  static async connectionToMongo() {
    try {
      if (this.db) return this.db
      this.db = await MongoClient.connect(process.env.M_URL, { useUnifiedTopology: true, useNewUrlParser: true })
        return this.db
      // return console.log("inside mongoConn constructor:", process.env.MONGO_DOMAIN);

    } catch (err) {
      console.log(err.stack);
    } finally {
      await MongoClient(this.url, this.options).close()
    }
  }

}


const db = null; //In router you should declare the dbname
module.exports = { Conn }
