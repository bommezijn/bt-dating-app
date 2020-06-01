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
const ObjectId = require('mongodb').ObjectId;

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
}, function(err) { // failureCallback
  throw (err);
});

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
  const preferedGenres = req.body.movieGenre;
  /**
   * @title Console.log coloring
   * @description Console log coloring, can be done with ANSI color escaping.
   * @source https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-
   * \x1b[33m = foreground yellow, \x1b[0m = reset instance so the rest isnt yellow either
   */
  console.log(`test check: ${preferedGenres}`);
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
    preferedGenres: preferedGenres,

  });
});

router.get('/findUser/:_id', (req, res, next) => {
  console.log(`Enter add/findUser/${JSON.stringify(req.params)}`);
  let objId = new ObjectId(req.params._id);

  db.initialize(dbName, collectionName, function(dbCollection) {
    dbCollection.findOne({_id: objId}, (error, result) => {
      console.log(`${JSON.stringify(result)}`);
      if (error) throw error;
      res.json(result);
    });
  });
});

router.get('/allUsers', (req, res, next) => {
  db.initialize(dbName, collectionName, function(dbCollection) {
    dbCollection.find().toArray((error, result) =>{
      if (error) throw error;
      // console.log(result); //logs all users within user
      // console.log(result.length); //prints length of users
      // res.json(result);
      res.render('./partial/user', {
        allUsers: result,
      });
    });
  });
});

module.exports = router;
