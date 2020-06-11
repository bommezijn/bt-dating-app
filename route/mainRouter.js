/**
    @author Nathan Bommezijn
    @description Main route
*/
const express = require('express');
/* mount router-level middleware  */
// eslint-disable-next-line new-cap
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: false,
}));
let data;
const dbName = 'dateapp';
const collectionName = 'users';
const db = require('../db');
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
    data = result;
  });

  router.get('/', (req, res) => {
    res.render('index', {
      title: 'Dating App',
    });
  });

  router.get('/about', (req, res) => {
    res.render('about', {
      title: 'A$$',
    });
  });

  /**
   * @source https://expressjs.com/en/4x/api.html#router
   *  */
  router.get('/feature', (req, res, next) => {
    const minAge = req.body.minAge;
    const maxAge = req.body.maxAge;
    // const distance = req.body.distance;
    const sexPref = req.body.sexPref;
    // console.log(`\x1b[33mTHIS IS SPARTA\x1b[0m \n ${data}`);
    res.render('feature', {
      title: 'prefences',
      filterData: data,
      minAge: minAge | '18',
      maxAge: maxAge | '28',
      sexPref: sexPref | 'non-specified',
    });
  });

  const ageIsHigher = (age, minAge) => {
    return age >= minAge;
  };

  const ageIsLower = (age, maxAge) => {
    return age <= maxAge;
  };

  const sexualPreference = (sexuality, preferedSexuality) => {
    return sexuality === preferedSexuality;
  };

  router.post('/feature', (req, res, next) => {
    const minAge = req.body.minAge;
    const maxAge = req.body.maxAge;
    const sexPref = req.body.sexPref;
    const resultData = data.filter((user) =>
      ageIsHigher(user.age, minAge) &&
      ageIsLower(user.age, maxAge) &&
      sexualPreference(user.gender, sexPref));
    res.render('feature', {
      title: 'sent Data',
      filterData: resultData,
      minAge: minAge,
      maxAge: maxAge,
      // distance: distance,
      sexPref: sexPref,
    });
  });


  // ASSIGNMENTS FROM CLASS
  /* Send img of girl when visiting /imagefile */
  router.get('/imagefile', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/img/file.jpg'));
  });
  // ENDOF ASSIGNMENTS FROM CLASS

  /**
   * route for when there is no page found.
   * @source https://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
   */
  router.use((req, res, next) => {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.render('404', {
        title: '404',
        url: req.url,
      });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({
        error: 'Not found',
      });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  });

  // End of db initialization for
}, function(err) { // failureCallback
  throw (err);
});
module.exports = router;
