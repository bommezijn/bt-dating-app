const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const dbName = 'dateapp';
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
    name: req.body.name,
  });
});

router.post('/user', (req, res, next) => {
  const nameUser = req.body.name;
  const ageUser = req.body.age;
  const genderUser = req.body.gender;
  const latitudeUser = req.body.locationLat;
  const longitudeUser = req.body.locationLang;

  async function sendUserFormData() {
    try{
      await client.connect();
      console.log(`Connected to ${process.env.MONGO_DOMAIN} from \x1b[33mAddUser.js\x1b[0m`);
      const db = client.db(dbName)
    }
    catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  }

  // console.log(`name: ${req.body.name}, gender: ${genderUser.toSt}`);
  /**
   * @title Console.log coloring
   * @description Console log coloring, can be done with ANSI color escaping.
   * @source https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-
   * \x1b[33m = foreground yellow, \x1b[0m = reset instance so the rest isnt yellow either
     */
  console.log(`Gender returns type: \x1b[33m${typeof(genderUser)}, ${genderUser}\x1b[0m`);
  res.render('./partial/user', {
    name: nameUser,
    age: ageUser,
    gender: genderUser,
    latitude: latitudeUser,
    longitude: longitudeUser,
  });
});

module.exports = router;
