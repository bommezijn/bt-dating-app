const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET about page */
router.get('/about', function(req, res) {
  res.render('about', {title: 'About me', name:'Nathan'});
  router.use(express.static('public'));
});

/* Route Path to  */

module.exports = router;