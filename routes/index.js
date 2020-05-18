const express = require('express');
const router = express.Router();

// PUG VARIANT
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', (req, res) => {
  res.render('index', {
    title: 'my life'
  });
});

/* GET about page */
router.get('/about', function (req, res) {
  res.render('about', {
    title: 'About me',
    name: 'Nathan'
  });
  router.use(express.static('public'));
});

router.get('/routePath', (req, res) => {
  router.use(express.static('public'));
  res.sendFile('/public/images/sister.jpg');
});

/* Sending files based on the query they enter in the addressbar */
router.get('/images/:fileName', function (req, res, next) {

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