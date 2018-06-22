const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require ('cors');
var passport = require("passport");
const config = require("./config/database");
const configa = require("./config/agreementDB");

// Connect to Database marketauth
mongoose.connect(config.database);

// Connect to Database agreementdb
mongoose.connect(configa.database).catch(err =>{
  console.log('rejected promise:' +err);
  mongoose.disconnect();
});
//mongoose.connect('mongodb://localhost:27017/agreementdb');

//On Connection
mongoose.connection.on('connected', () =>{
  console.log('Connected to database:' +config.database);
});

//On Connection
mongoose.connection.on('connected', () =>{
  console.log('Connected to database:' +configa.database);
});

//On Error
mongoose.connection.on('error', (err) =>{
  console.log('Database error:' +err);
});

// initialize express
const app = express();

// Routes
const users = require('./routes/users');
const agreements = require('./routes/agreements');

const port = 3000;

// cors middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body-parser middleware
app.use(bodyParser.json());

// Passport middleware initialization
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// user route
app.use('/users', users);

app.use('/agreements', agreements);


//Index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.listen(port, () => {
  console.log('Server start on port' +port);
});
