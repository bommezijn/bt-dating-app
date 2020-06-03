/**
 * @file Managing routes for add/
 * @description Manages routing and data retrieval from db for fake user data.
 * Also used source for coloring the console.
 * \x1b[33m = foreground yellow,
 * \x1b[0m = reset instance so the rest isnt yellow either
 * @source https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-
 * @author Nathan Bommezijn
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
 * @description Initionalisation of database connection. Hold until I'm done
 * @source https://dev.to/lenmorld/rest-api-with-mongodb-atlas-cloud-node-and-express-in-10-minutes-2ii1
 */
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
  // get all items
  dbCollection.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  /**
 * @title Create view of movie genres within /user/add
 * @description Router to add and fill form with array of genres to create checkboxes.
 * @param {int32} num_id identifier for collection genre.
 */
  router.get('/add', (req, res, next) => {
    dbCollection.findOne({
      num_id: 1,
    }, (error, result) => {
      if (error) throw error;
      // res.json(result);
      res.render('partial/addUser', {
        result: result,
      });
    });
  });

/**
 * @title /ADD USER CREATE user with data from form.
 * @description Retrieves data from request body, parses it into mongodb.
 */
  router.post('/add', (req, res, next) => {
    const userBody = req.body;
    const nameUser = req.body.name;
    const ageUser = req.body.age;
    const genderUser = req.body.gender;
    const preferedGenres = req.body.movieGenre;
    console.log(`test check: ${nameUser} likes ${preferedGenres}`);
    dbCollection.insertOne(userBody, (error, result) => {
      if (error) throw error;
      dbCollection.find().toArray((_error, _result) => {
        if (_error) throw _error;
        res.render('./user', {
          allUsers: _result,
          name: nameUser,
          age: ageUser,
          gender: genderUser,
          preferedGenres: preferedGenres,
        });
      });
    });
  });

  /* retrieves specific user on _ID and parses it as a json object.
    Only works if you know the exact _id ObjectId Notation from MongoDB */
  router.get('/findUser/:_id', (req, res, next) => {
    console.log(`Enter add/findUser/${JSON.stringify(req.params)}`);
    const objId = new ObjectId(req.params._id);

    dbCollection.findOne({
      _id: objId,
    }, (error, result) => {
      console.log(`${JSON.stringify(result)}`);
      if (error) throw error;
      res.json(result);
    });
  });

  /* READ all users within collection 'users' */
    /**
 * @title Retrieve users from mongoDB
 * @description retrieves all users in collection. 
 */
  router.get('/viewAllUsers', (req, res, next) => {
    dbCollection.find().toArray((error, result) => {
      if (error) throw error;
      res.render('./user', {
        allUsers: result,
      });
    });
  });

  router.post('/updateUser', (req, res, next) => {
    const item = {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
    };
    const id = req.body.id;
    dbCollection.updateOne({'_id': new ObjectId(id)}, {$set: item}, (err, result) => {
      if (err) throw err;
      console.log(`User ${req.body.id} updated`);
      dbCollection.find().toArray((err, result) => {
        if (err) throw err;
        res.render('./user', {
          allUsers: result,
        });
      });
    });
  });

  /*
DELETE user when clicked on delete key
 */
/**
 * @title DELETE an user
 * @description
 * @souorce https://www.youtube.com/watch?v=-JcgwLIh0Z4 Retrieved 2 June 2020. 
 */
  router.post('/deleteUser', (req, res) => {
    // console.log('\x1b[33mDelete item with id: \x1b[0m', itemId);
    dbCollection.deleteOne({_id: new ObjectId(req.body.id)}, (err, result) => {
      if (err) throw err;
      dbCollection.find().toArray((err, result) => {
        if (err) throw err;
        console.log(`----------NEW LINE--------- \n ${JSON.stringify(req.body.id)}`);
        res.render('./user', {
          allUsers: result,
        });
      });
    });
  });

  // End of db initialization for
}, function(err) { // failureCallback
  throw (err);
});

// Adds list of genres to /addUser (seperate collection)
router.get('/add', (req, res, next) => {
  console.log('Entered add/user (route:/add + render: partial/addUser)');
  db.initialize(dbName, 'genres', function(dbCollection) {
    dbCollection.findOne({
      num_id: 1,
    }, (error, result) => {
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

module.exports = router;
