const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

/* The fix for this was putting mainrouter on the end
  - downright removing the same router from mainRouter
  - adding correct routing of creating user
  - fixing the form action to ./user
  - explaining that my 404 is hijacking the route for a moment
  - VERY ANNOYING: How I named my files and routes.
  - In principle you want a route for each element of a CRUD.
   */

router.get('/user', (req, res, next) => {
      console.log('abdel')
      res.render('partial/addUser', {
        name: req.body.name,
      });
    });

router.post('/user', (req, res, next) => {

      const nameUser = req.body.name;
      const ageUser = req.body.age;
      const genderUser = req.body.gender;
      const latitudeUser = req.body.locationLat;
      const longitudeUser = req.body.locationLang;
      res.render('./partial/user', {
        name: nameUser,
        age: ageUser,
        gender: genderUser,
        latitude: latitudeUser,
        longitude: longitudeUser,
      });
    });

module.exports = router;
