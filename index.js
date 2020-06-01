/**
    @author Nathan Bommezijn
    @description Setting up and serving a local node application
*/

/**
 * @title Declaring requirements & Constants
 * @description calling required packages and creating constants
 * @constant myEnv env variables, expanded with dotenvExpand to make easier URI, USER HAS TO CHANGE IT TO THEIR OWN
 */
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const myEnv = dotenv.config();
dotenvExpand(myEnv);

/**
 * @title delcaration of express requirements
 * @description Create and use express variables to run the application.
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3030;

/**
 * @title mongoDB
 * @description Enables mongoDB and declaring mongoDB variables
 * @constant URI dotenvExpand variable, declare your userdata there
 */
// const {  MongoClient } = require('mongodb');
// const uri = process.env.M_URL;

// async function instantiateMongo() {
//   const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
//   try {
//       await client.connect(); //will return a promise, use await to indicate to wait for further action
//       await listDatabases(client)
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await client.close();
//   }
  
// }

// instantiateMongo().catch(console.err);

// async function listDatabases(client){
//   const databaseList = await client.db().admin().listDatabases();
//   console.log(`dbs:`);
//   databaseList.databases.forEach(db => {
//     console.log(` - ${db.name}`)
//   });
// };

const db = require('./db');
const dbName = 'dateapp';
const collectionName = 'users';

// << db init >>
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
  // get all items
  dbCollection.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  // << db CRUD routes >>
}, function(err) { // failureCallback
  throw (err);
});



/* Setup express for EJS */
app.set('view engine', 'ejs');
// Set views folder
app.set('views', path.join(__dirname, 'view'));

// Allow app to get static files from public
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

/* Import mainRouter && addUser for application */
const mainRouter = require('./route/mainRouter');
const addUser = require('./route/addUser');
/* Express use mainRouter for index */

app.use('/add', addUser);
app.use('/', mainRouter);


// Express listens to port 3030 and on start print link
app.listen(3030, () => console.log(`Dating app listening at \x1b[31mhttp://localhost:${port}\x1b[0m`));
