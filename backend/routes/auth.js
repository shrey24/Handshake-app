// route to check auth of client
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
// const db = require('../models');
const db = require('./database');
const user_types = require('../config/datatypes');


