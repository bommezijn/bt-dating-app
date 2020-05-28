/**
    @author Nathan Bommezijn
    @description Main route
*/
const express = require('express');
/* mount router-level middleware  */
// eslint-disable-next-line new-cap
const router = express.Router();
const path = require('path');
const data = require(path.join(__dirname, '../public/data/data'));

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
    const distance = req.body.distance;
    const sexPref = req.body.sexPref;
  res.render('feature', {
    title: 'prefences',
    filterData: data.users,
    minAge: minAge, maxAge: maxAge, distance: distance, sexPref: sexPref,
});
});

router.post('/feature', (req, res, next) => {
    const minAge = req.body.minAge;
    const maxAge = req.body.maxAge;
    const distance = req.body.distance;
    const sexPref = req.body.sexPref;
    res.render('feature', {
        title: 'sent Data',
        filterData: data.users,
    minAge: minAge, maxAge: maxAge, distance: distance, sexPref: sexPref,
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

module.exports = router;
