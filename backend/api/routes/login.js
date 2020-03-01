const express = require('express');
const router = express.Router();
const db = require('../../models');
const { user_types } = require('../../config/datatypes');


// response: email, password
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

module.exports = router;