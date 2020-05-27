/* eslint-disable comma-dangle */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const path = require('path');

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

/* GET filter page */
router.get('/filter', function(req, res) {
  let userData = [
    {
      name: 'Nathan',
      age: 23,
      gender: 'male',
      latitude: 52.1924,
      longitude: 5.39376,
      preferences: {
        sexPref: 'female',
        minAge: 20,
        maxAge: 28,
        movieInterest: [
          'action',
          'adventure',
          'animation',
          'comedy',
          'fantasy',
          'thriller',
          'sci-fi',
          'horror'
        ]
      },
    },
    {
      name: 'Nadine',
      age: 23,
      gender: 'female',
      latitude: 52.1924,
      longitude: 5.39376,
      preferences: {
        sexPref: 'other',
        minAge: 20,
        maxAge: 25,
        movieInterest: [
          'adventure',
          'animation',
          'comedy',
          'drama',
          'fantasy',
          'romance',
        ]
      },
    }];
  res.render('filter', {
    title: 'filter',
    filterData: userData,
  });
});

/* Use GEOLIB & HTML geoloc API to populate and calc distance between user
  https://www.npmjs.com/package/geolib
  */


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
