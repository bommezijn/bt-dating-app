/**
 * @title mongoDB
 * @description Enables mongoDB and declaring mongoDB variables
 * @constant URI dotenvExpand variable, declare your userdata there
 */
const {  MongoClient } = require('mongodb');
const uri = process.env.M_URL;

async function instantiateMongo() {
  const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  try {
      await client.connect(); //will return a promise, use await to indicate to wait for further action
      await listDatabases(client)
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
  
}

instantiateMongo().catch(console.err);

async function listDatabases(client){
  const databaseList = await client.db().admin().listDatabases();
  console.log(`dbs:`);
  databaseList.databases.forEach(db => {
    console.log(` - ${db.name}`)
  });
};
