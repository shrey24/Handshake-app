// import express module
const express = require('express');
const PORT = 3000;

const app = express(); // create an express app , npx eslint -init
const bodyParser = require('body-parser'); // require express middleware body-parser
const session = require('express-session'); // require express session
const cookieParser = require('cookie-parser');
const path = require('path');

const homeRoutes = require('./api/routes/home');

app.use(express.static(path.join(__dirname, '/public'))); // specify the path of static directory

// use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use cookie parser to parse request headers
app.use(cookieParser());
// use session to store user data between HTTP requests
app.use(session({
  secret: 'cmpe_273_secure_string',
  resave: false,
  saveUninitialized: true,
}));
//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/home', homeRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  