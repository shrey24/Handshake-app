const express = require('express');
const router = express.Router();
const db = require('./database');
const checkAuth = require('./check_auth');

const APP_STATUS_PENDING = 'pending';
const APP_STATUS_REVIEWED = 'reviewed';
const APP_STATUS_DECLINE = 'declined';

let selectStudentSql = 'SELECT * FROM student_profile WHERE user_id = ?;';
let eduSql = 'SELECT * FROM student_education WHERE user_id = ?;';
let expSql = 'SELECT * FROM student_experience WHERE user_id = ?;';


// GET company/profile/[:company_id] or company/profile/[Me]
// NOTE: company_id is irrelevent if the request comes from a company
router.get('/profile/:company_id', checkAuth, (req, res) => {
    let id = req.params.company_id;
    if( req.jwtData.user_type === 'company') {
        id = req.jwtData.user_id;
    }
    let sql = 'SELECT * FROM company_profile WHERE user_id = ?;';
    db.query(sql, id, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else if (results.length === 0) {
            console.log(`'${id}' doesnot exists`);
            res.status(400).json({ error:`company_id '${id}' doesnot exists` });
            return;
        } else {
            res.status(200).json(results);
        }
    });
});

// get jobs posted by this company
router.get('/jobs', checkAuth, (req, res) => {
    let sqlGetJobs = 'SELECT * FROM jobs WHERE company_id = ?;';
    db.query(sqlGetJobs, req.jwtData.user_id, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

// add new job
router.post('/job', checkAuth, (req, res) => {
    const { user_id } = req.jwtData;
    const data = { company_id: user_id, ...req.body };
    console.log('insert new job data:', data);
    let sqlPostJob = 'INSERT INTO jobs SET ?;';
    db.query(sqlPostJob, data, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json({ msg: 'success', id: result['insertId'] });
        }
    });
});

// get applicaions of a job // REVIEW SQL
router.get('/applications/:job_id', checkAuth, (req, res) => {
    let sqlGetApps = 'SELECT * FROM job_applications JOIN student_profile WHERE company_id = ? AND job_id = ?;';
    const { user_id } = req.jwtData;
    const job_id = req.params.job_id;

    db.query(sqlGetApps, [user_id, job_id], (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});


module.exports = router;
