const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router
    .get('/', (req, res, next) => {
      res.render('partial/addUser', {
        name: req.body.name,
      });
    })
    .post('addUser', (req, res, next) => {
      const nameUser = req.body.name;
      const ageUser = req.body.age;
      const genderUser = req.body.gender;
      const latitudeUser = req.body.locationLat;
      const longitudeUser = req.body.locationLang;
      res.render('partial/user', {
        name: nameUser,
        age: ageUser,
        gender: genderUser,
        latitude: latitudeUser,
        longitude: longitudeUser,
      });
    });

module.exports = router;
