// import express module

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const PORT =  process.env.PORT;

const app = express(); // create an express app , npx eslint -init
const bodyParser = require('body-parser'); // require express middleware body-parser
const session = require('express-session'); // require express session
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/mongodb');
console.log('..script loading');

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const studentProfileRoutes = require('./routes/student_profile');
const companyRoutes = require('./routes/company');
const studentRoutes = require('./routes/student');
const jobsRoutes = require('./routes/jobs');
const eventsRoutes = require('./routes/events');
const messagesRoutes = require('./routes/messages');

app.use(express.static(path.join(__dirname, '/public'))); // specify the path of static directory

app.use(morgan('dev'));
// use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use cookie parser to parse request headers
app.use(cookieParser());

// use session to store user data between HTTP requests
// app.use(session({
//   secret: 'cmpe_273_secure_string',
//   resave: false,
//   saveUninitialized: true,
// }));
//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

console.log('connecting to mondo db...');
// connect to mongodb
connectDB();

// general middleware to handle errors
app.use((error, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: error.message
  })
});

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/student-profile', studentProfileRoutes);
app.use('/company', companyRoutes);
app.use('/student', studentRoutes);
app.use('/jobs', jobsRoutes);
app.use('/events', eventsRoutes);
app.use('/messages', messagesRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`CORs env.CLIENT_URL: ${process.env.CLIENT_URL}`);
  });
  