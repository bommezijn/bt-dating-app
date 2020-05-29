/**
    @author Nathan Bommezijn
    @description Setting up and serving a local node application
*/

/**
 * @title Declaring requirements & Constants
 * @description calling required packages and creating constants
 * @constant myEnv env variables, expanded with dotenvExpand to make easier URI
*/
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const myEnv = dotenv.config();
dotenvExpand(myEnv);
// Require statements and CONSTs
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3030;

/* Import mainRouter for application */
const mainRouter = require('./route/mainRouter');

/* Setup express for EJS */
app.set('view engine', 'ejs');
// Set views folder
app.set('views', path.join(__dirname, 'view'));

// Allow app to get static files from public
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
  console.log(process.env.MONGO_URL);
  next();
});

/* Express use mainRouter for index */
app.use('/', mainRouter);


// Express listens to port 3030 and on start print link
app.listen(3030, () => console.log(`Dating app listening at http://localhost:${port}`));
