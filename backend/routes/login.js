const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
// const db = require('../models');
const db = require('./database');
const { user_types } = require('../config/datatypes');

const isValidPassword = (chk_password, db_password_hash) => {
    return bcrypt.compareSync(chk_password, db_password_hash);
}
 
router.post('/student', (req, res, next) => {
    const {email, password} = req.body;
    let queryUser = 'SELECT * FROM user_auth WHERE email = ?';
    db.query(queryUser,  [email] , (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(results);
            if(results.length > 0) { // check password
                if(isValidPassword(password, results[0].password) && 
                results[0].user_type === user_types['student']) {
                    console.log(results[0]);
                    const token = jwt.sign({
                            email,
                            user_id : results[0].user_id,
                            user_type : results[0].user_type
                            }, 
                            process.env.JWT_KEY,
                            { expiresIn: '1h' }
                        );
                    //Sucess, send a jwt token back
                    res.status(200).json({
                        'msg': 'authentication successful',
                        token
                    });

                } else {
                    res.status(401).send('Unauthorized');
                    return;
                }
            } else {
                res.status(401).send('No such user');
            }
        }
    });
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