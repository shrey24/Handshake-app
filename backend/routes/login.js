const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
// const db = require('../models');
const checkAuth = require('./check_auth'); // middleware
const UserAuth = require('../models/UserAuth');
const user_types = require('../config/datatypes');

const isValidPassword = (chk_password, db_password_hash) => {
    return bcrypt.compareSync(chk_password, db_password_hash);
}

// API: GET /login
// used to get the user data if authenticated
router.get('/', checkAuth, async (req, res) => {
    // query user_auth collection with jwt data to check if the jwt token is still valid
    try {
        const userAuthResult = await UserAuth.findOne({ _id : req.jwtData.user_id });
        if (userAuthResult) { // jwtData is valid (token authorized): send user data
            res.json({
                user_id: req.jwtData.user_id,
                email: req.jwtData.email,
                user_type: req.jwtData.user_type
            });
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);        
    }
});

// login student - return jwt
/**
 * jwt signed as:
 * {
     email,
     user_id 
     user_type 
 * }
 */
router.post('/', async (req, res, next) => {
    const {email, password} = req.body;
    console.log('/login req.data: ', req.body);

    try {
        const userAuthResult = await UserAuth.findOne({ email });
        console.log('dbResponse:', userAuthResult);
        if(userAuthResult) {
            if(isValidPassword(password, userAuthResult.password)) {
                const token = jwt.sign({
                    email,
                    user_id : userAuthResult._id,
                    user_type : userAuthResult.user_type
                    }, 
                    process.env.JWT_KEY,
                    { expiresIn: '2h' }
                );
                //Sucess, send a jwt token back
                return res.status(200).json({
                    'msg': 'authentication successful',
                    token,
                    user: {
                        email,
                        user_id : userAuthResult._id,
                        user_type : userAuthResult.user_type
                    }
                });
            } else {
                return res.status(401).send('Unauthorized');
            }
        } else {
            return res.status(401).send('No such user');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

// response: email, password
/*
router.post('/student', (req, res, next) => {
    const {email, password} = req.body;
    let msg = "";
    console.log(req.body);
    db.user_auth.findOne({ where: { email: email }})
        .then((user) => {
            console.log("db.findOne: ", user);
            if(!user){
                msg = "Authentication Failed: No such user";
                res.header(401).json({ error : msg });
            } else if(user.user_type !== user_types['student']) {
                msg = "Authentication Failed: user type in not student";
                res.header(401).json({ error : msg });
            } else if (!db.user_auth.validPassword(password)) {
                msg = "Authentication Failed: incorrect password";
                res.header(401).json({ error : msg});
            } else { //success
                // res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                // res.session.user_id = user.
                res.header(200).send("Success");
            }
        })
        .catch((e) => {
            console.log("db.error: ", e);
            res.header(401).json({ error : e});
        });
});
*/


module.exports = router;