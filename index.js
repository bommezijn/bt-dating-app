/**
    @author Nathan Bommezijn
    @description Setting up and serving a local node application
*/
require('dotenv').config();
// Require statements and CONSTs
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3030;

/* Setup express for EJS */
app.set('view engine', 'ejs');
// Allow app to get static files from public
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.send('hello world!'));

app.listen(3030, () => console.log(`Dating app listening at http://localhost:${port}`));
