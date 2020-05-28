/* eslint-disable comma-dangle */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const path = require('path');
const dataFile = require('../public/data/data.json');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'my life',
  });
});

/* GET about page */
router.get('/about', function(req, res) {
  res.render('about', {
    title: 'About me',
    name: 'Nathan',
  });
  router.use(express.static('public'));
});

/* GET filter page
  Use GEOLIB & HTML geoloc API to populate and calc distance between user
  https://www.npmjs.com/package/geolib
  !! Currently importing data from JSON and loop through the users.
*/
router.get('/filter', function(req, res) {
  res.render('filter', {
    title: 'filter',
    filterData: dataFile.users,
  });
});

/*
  When sending data, /URL should match current URL + Form action.
  req.body.NAMEINPUT
  and render it in a new page called post
 */
router.post('/filter', function(req, res) {
  const minAge = req.body.minAge;
  const maxAge = req.body.maxAge;
  const distance = req.body.distance;
  const sexPref = req.body.sexPref;
  res.render('post', {
    title: 'sent Data', minAge: minAge, maxAge: maxAge, distance: distance, sexPref: sexPref
  });
});

router.get('/imagefile', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/images/babe.jpg'));
});
/* Sending files based on the query they enter in the addressbar */
router.get('/images/:fileName', function(req, res, next) {
  let options = {
    root: path.join(__dirname, 'public')
  };

  res.sendFile(req.params.fileName, options, (err) => {
    if (err) next(err);
    else console.log('sent:', fileName);
  });
});


/*
// route for when there is no page found.
router.get('*', (req, res) => {
  router.use(express.static('public'));
  res.render('error', {title: '404'});
});
*/

module.exports = router;
