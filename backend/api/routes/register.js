const express = require('express');
const router = express.Router();
// const db = require('../../models');
const { user_types } = require('../../config/datatypes');
const db = require('./database');

// Insert post 1
// app.get('/addpost1', (req, res) => {
//     let post = {title:'Post One', body:'This is post number one'};
//     let sql = 'INSERT INTO posts SET ?';
//     let query = db.query(sql, post, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Post 1 added...');
//     });
// });

router.post('/', (req, res, next) => {
    console.log(req.body);
    let InsertSql = 'INSERT INTO user_auth SET ?';
    // const student = {
    //     user_id:
    //     email:
    //     password:
    //     user_type:
    // }
});
/*
router.post('/', (req, res, next) => {
    console.log(req.body);
    const { email, password, type } = req.body;
    const userType = user_types;
    console.log(user_types);
    if ( !userType.hasOwnProperty(type) ){
        res.header(500).send(`user_type ${type} not supported`);
        return;
    }

    db.user_auth.create({
        email: email,
        password: password,
        user_type: userType[type]
    })
    .then(user => {
        console.log('user_auth entry success');
        const data = user.dataValues;
        if(data.user_type === userType['student']) { // create student profile
            const { email, name, university } = req.body;
            console.log('setting student profile...');
            db.student_profile.create({
                user_id : data.user_id,
                email: email,
                name: name,
                university: university
            })
            .then((profile) => {
                console.log('student_profile created successfully', profile);
                res.status(200).send(profile);
            })
            .catch((err) => res.send("error, student_profile NOT created. db_msg: " + err))
        }
        else if(user.user_type === userType['company']) {
            console.log('creating company profile...');
        }
        
    })
    .catch((err) => res.send("error, user_auth NOT created. you sent: " + err));
});
*/
module.exports = router;