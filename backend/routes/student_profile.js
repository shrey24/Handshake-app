const express = require('express');
const router = express.Router();
// const db = require('../../models');
const db = require('./database');
const checkAuth = require('./check_auth');

let selectStudentSql = 'SELECT * FROM student_profile WHERE user_id = ?;';
let eduSql = 'SELECT * FROM student_education WHERE user_id = ?;';
let expSql = 'SELECT * FROM student_experience WHERE user_id = ?;';


//> /student-profile/:user_id
router.get('/:user_id', (req, res) => {
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

router.put('/', checkAuth, (req, res) => {
    const user_id = req.jwtData.user_id;
    const data = req.body;
    let updateProfileSql = 'UPDATE student_profile SET ? WHERE user_id = ?;';
    db.query(updateProfileSql, [data, user_id], (err, result) => {
        if(err) res.status(500).send(err);
        else {
            res.status(200).json({ msg: 'success', result: result });
        }
    });
});

// education section
router.post('/education', checkAuth, (req, res) => {
    const { college_name, degree, major, start_date, end_date, gpa } = req.body;
    const { user_id } = req.jwtData;
    const eduData = { user_id, college_name, degree, major, start_date, end_date, gpa };
    let InsertEduSql = ' INSERT INTO student_education SET ?;';
    db.query(InsertEduSql, eduData, (err, result) => {
        if(err) res.status(500).send(err);
        else {
            res.status(200).json({ msg: 'success', id: result['insertId'] });
        }
    });
});

router.put('/education/:id', checkAuth, (req, res) => {
    //  TODO check same user session
    let updateEduSql = 'UPDATE student_education SET ? WHERE id = ? AND user_id = ?;';
    const data = req.body;
    const id = req.params.id;
    console.log(`update data for user id: ${id}`);
    console.log('data: ', data);    
    db.query(updateEduSql, [data, id, req.jwtData.user_id], (err, result) => {
        if(err) res.status(500).send(err);
        else {
            res.status(200).json({ msg: 'success', result: result });
        }
    });
});

// experience section
router.post('/experience', checkAuth, (req, res) => {
    const { company_name, title, location, start_date, end_date, work_desc } = req.body;
    const { user_id } = req.jwtData;
    const data = { user_id, company_name, title, location, start_date, end_date, work_desc };
    let InsertEduSql = ' INSERT INTO student_experience SET ?;';
    db.query(InsertEduSql, data, (err, result) => {
        if(err) res.status(500).send(err);
        else {
            res.status(200).json({ msg: 'success', id: result['insertId'] });
        }
    });
});

router.put('/experience/:id', checkAuth, (req, res) => {
    //  TODO check same user session
    updateEduSql = 'UPDATE student_experience SET ? WHERE id = ? AND user_id = ?;';
    const data = req.body;
    const id = req.params.id;
    console.log(`update data for user id: ${id}`);
    console.log('data: ', data);    
    db.query(updateEduSql, [data, id, req.jwtData.user_id], (err, result) => {
        if(err) res.status(500).send(err);
        else {
            res.status(200).json({ msg: 'success', result: result });
        }
    });
});

module.exports = router;