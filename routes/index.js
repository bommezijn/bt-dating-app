const express = require('express');
const router = express.Router();

/* GET home page. */
// PUG VARIANT
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET about page */
// router.get('/about', function(req, res) {
//   res.render('about', {title: 'About me', name:'Nathan'});
//   router.use(express.static('public'));
// });

/* Route Path to  */


router.get('/', (req, res) => {
  res.render('index', {title: 'my life'});
});


module.exports = router;
