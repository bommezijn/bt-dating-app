/**
 * @file Managing routes for add/
 * @description Manages routing and data retrieval from db for fake user data.
 * Also used source for coloring the console.
  * \x1b[33m = foreground yellow,
  * \x1b[0m = reset instance so the rest isnt yellow either
 * @source https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-
 * @author Nathan Bommezijn
 */


/* The fix for this was putting mainrouter on the end
  - downright removing the same router from mainRouter
  - adding correct routing of creating user
  - fixing the form action to ./user
  - explained that my 404 is hijacking the route for a moment
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
 * See {@link dbFile}
 * @source https://dev.to/lenmorld/rest-api-with-mongodb-atlas-cloud-node-and-express-in-10-minutes-2ii1
 */

router.get('/user', (req, res, next) => {
  console.log('Entered add/user');
  db.initialize(dbName, 'genres', function(dbCollection) {
    dbCollection.findOne({num_id: 1}, (error, result) => {
      // Check if result returns object genre
      // console.log(`\x1b[33m!!MUCHO IMPORTANTE ${result.genre}\x1b[0m`);
      if (error) throw error;
      // res.json(result);
      res.render('partial/addUser', {
        name: 'Add a user to database',
        result: result,
      });
    });
  });
});

router.post('/user', (req, res, next) => {
  const userBody = req.body;
  const nameUser = req.body.name;
  const ageUser = req.body.age;
  const genderUser = req.body.gender;
  const preferedGenres = req.body.movieGenre;
  console.log(`test check: ${nameUser} likes ${preferedGenres}`);
  db.initialize(dbName, collectionName, function(dbCollection) {// successCallback
    dbCollection.insertOne(userBody, (error, result) => {
      if (error) throw error;
      // return user list
      dbCollection.find().toArray((_error, _result) => {
        if (_error) throw _error;
        // console.error(_result);
        res.render('./partial/user', {
          allUsers: _result,
          name: nameUser,
          age: ageUser,
          gender: genderUser,
          preferedGenres: preferedGenres,
        });
      });
    });
  }, function(err) { // failureCallback
    throw (err);
  });
});

/* retrieves specific user on _ID and parses it as a json object */
router.get('/findUser/:_id', (req, res, next) => {
  console.log(`Enter add/findUser/${JSON.stringify(req.params)}`);
  const objId = new ObjectId(req.params._id);

  db.initialize(dbName, collectionName, function(dbCollection) {
    dbCollection.findOne({_id: objId}, (error, result) => {
      console.log(`${JSON.stringify(result)}`);
      if (error) throw error;
      res.json(result);
    });
  });
});

/* Retrieves all users within collection 'users' */
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
