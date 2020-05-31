const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  Conn,
} = require('./mongoConnection');

/* The fix for this was putting mainrouter on the end
  - downright removing the same router from mainRouter
  - adding correct routing of creating user
  - fixing the form action to ./user
  - explaining that my 404 is hijacking the route for a moment
  - VERY ANNOYING: How I named my files and routes.
  - In principle you want a route for each element of a CRUD.
   */

router.get('/user', (req, res, next) => {
  console.log('Does it enter?');
  res.render('partial/addUser', {
    name: 'Add a user to database',
  });
});

router.post('/user', (req, res, next) => {
  const nameUser = req.body.name;
  const ageUser = req.body.age;
  const genderUser = req.body.gender;
  const latitudeUser = req.body.locationLat;
  const longitudeUser = req.body.locationLang;
  console.log(`Gender returns type: \x1b[33m${typeof(genderUser)}, ${genderUser}\x1b[0m`);

  Conn.db.collection('users').insertOne({
    'name': nameUser,
    'age': ageUser,
    'gender': genderUser,
    'latitude': latitudeUser,
    'longitude': longitudeUser,
  })
      .then((users) => res.json({users: users}))
      .catch((err) => res.json({error: err}));

  // console.log(`name: ${req.body.name}, gender: ${genderUser.toSt}`);
  /**
   * @title Console.log coloring
   * @description Console log coloring, can be done with ANSI color escaping.
   * @source https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-
   * \x1b[33m = foreground yellow, \x1b[0m = reset instance so the rest isnt yellow either
   */
  res.render('./partial/user', {
    name: nameUser,
    age: ageUser,
    gender: genderUser,
    latitude: latitudeUser,
    longitude: longitudeUser,
  });
});

module.exports = router;
