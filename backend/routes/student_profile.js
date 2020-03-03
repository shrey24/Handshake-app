const express = require('express');
const router = express.Router();
// const db = require('../../models');
const db = require('./database');
const checkAuth = require('./check_auth');

let selectStudentSql = 'SELECT * FROM student_profile WHERE user_id = ?;';
let eduSql = 'SELECT * FROM student_education WHERE user_id = ?;';
let expSql = 'SELECT * FROM student_experience WHERE user_id = ?;';

//> /student-profile/:user_id
router.get('/:user_id', checkAuth, (req, res) => {
    // console.log(req.body);
    const user_id = req.params.user_id;
    
    db.query(selectStudentSql+eduSql+expSql, [user_id, user_id, user_id],
        (err, results) => {
            if(err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                if(results[0].length === 0) {
                    console.log(`'${user_id}' doesnot exists`);
                    res.status(400).json({ msg:`'${user_id}' doesnot exists` });
                    return;
                }
                const profile_data = {
                    student_profile: results[0],
                    student_education: results[1],
                    student_experience: results[2]
                }
                res.send(profile_data);
            }
        });    
});

router.post('/education', checkAuth, (req, res) => {
    //  TODO check same user session
    console.log(req.jwtData);
    res.sendStatus(200);
    
    // const { college_name, degree, major, start_date, end_date, gpa, user_id } = req.body;
    // const eduData = { college_name, degree, major, start_date, end_date, gpa, user_id };
    // let InsertEduSql = ' INSERT INTO student_education SET ?;';
    // db.query(InsertEduSql, eduData, (err, result) => {

    // });

});

router.put('/education/:id', (req, res) => {
    //  TODO check same user session
    console.log('updating education for id : ', req.params);
    res.send(`updating education for id : ${req.params}`);
});


module.exports = router;