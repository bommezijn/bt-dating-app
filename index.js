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
 * @title Mongodb
 * @description Enables mongodb and declaring mongoDB variables
 * @constant URL dotenvExpand variable, declare your userdata there
 */
const {  MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = process.env.M_URL;
const client = new MongoClient(url, {  useUnifiedTopology: true });
const dbName = 'dateapp';

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to mongo server:", process.env.MONGO_DOMAIN);
    // Connected? Nice, do create/connect to db
    const db = client.db(dbName);

    // Use the collection 'users'
    const col = db.collection('users');

    // Construct a document of user
    let userDocument = {
        "name": "Nathan",
        "age": 23,
        "gender": "male",
        "latitude": 52.1924,
        "longitude": 5.39376,
        "preferences": {
            "sexPref": "female",
            "minAge": 20,
            "maxAge": 28,
            "movieInterest": [
            "action",
            "adventure",
            "animation",
            "comedy",
            "fantasy",
            "thriller",
            "sci-fi",
            "horror"
            ]
        }
    }
    // Commented out otherwise my db gonna be filled with the example data
    // const insertSingle = await col.insertOne(userDocument);
    // const findSingleDocument = await col.findOne();
    // console.log(findSingleDocument);

  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

/* Setup express for EJS */
app.set('view engine', 'ejs');
// Set views folder
app.set('views', path.join(__dirname, 'view'));

// Allow app to get static files from public
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({  extended: true }));
app.use(bodyParser.json());

/* Import mainRouter && addUser for application */
const mainRouter = require('./route/mainRouter');
const addUser = require('./route/addUser');
/* Express use mainRouter for index */
app.use('/', mainRouter);
app.use('/add', addUser);


// Express listens to port 3030 and on start print link
app.listen(3030, () => console.log(`Dating app listening at http://localhost:${port}`));
