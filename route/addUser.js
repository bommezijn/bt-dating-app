/* The fix for this was putting mainrouter on the end
  - downright removing the same router from mainRouter
  - adding correct routing of creating user
  - fixing the form action to ./user
  - explaining that my 404 is hijacking the route for a moment
  - VERY ANNOYING: How I named my files and routes.
  - In principle you want a route for each element of a CRUD.
   */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const db = require('../db');
const dbName = 'dateapp';
const collectionName = 'users';

/**
 * @title mongoDB
 * @description NOT MY OWN CODE, after searching for many examples, ended up using this and mostly copying it.
 * It does feel bad, but I want to atleast create and delete.
 * Sadly now am initializing a new db connection for each route.
 * @source https://dev.to/lenmorld/rest-api-with-mongodb-atlas-cloud-node-and-express-in-10-minutes-2ii1
 */
// << db init >>
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
  // get all items
  dbCollection.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  // << db CRUD routes >>
}, function(err) { // failureCallback
  throw (err);
});

/* const {  MongoClient } = require('mongodb');
const uri = process.env.M_URL;
let db = null;
const client = MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
async function instantiateMongo() {
  try {
      await client.connect(); //will return a promise, use await to indicate to wait for further action
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}
instantiateMongo().catch(console.err);
async function createUser(client, newUser){
  const result = await client.db('dateapp').collection('users').insertOne(newUser);
  console.log(`New user created with id: ${result.insertedId}`);
} */

router.get('/user', (req, res, next) => {
  console.log('Does it enter?');
  res.render('partial/addUser', {
    name: 'Add a user to database',
  });
});

router.post('/user', (req, res, next) => {
  const userBody = req.body;
  const nameUser = req.body.name;
  const ageUser = req.body.age;
  const genderUser = req.body.gender;
  const latitudeUser = req.body.locationLat;
  const longitudeUser = req.body.locationLang;
    /**
   * @title Console.log coloring
   * @description Console log coloring, can be done with ANSI color escaping.
   * @source https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-
   * \x1b[33m = foreground yellow, \x1b[0m = reset instance so the rest isnt yellow either
   */
  console.log(`Gender returns type: \x1b[33m${typeof(genderUser)}, ${genderUser}\x1b[0m`);

  db.initialize(dbName, collectionName, function(dbCollection) {// successCallback
    dbCollection.insertOne(userBody, (error, result) => {
      if (error) throw error;
      // return user list
      dbCollection.find().toArray((_error, _result) => {
        if (_error) throw _error;
        console.error(_result);
      });
    });
  }, function(err) { // failureCallback
    throw (err);
  });

  res.render('./partial/user', {
    name: nameUser,
    age: ageUser,
    gender: genderUser,
    latitude: latitudeUser,
    longitude: longitudeUser,
  });
});

module.exports = router;
