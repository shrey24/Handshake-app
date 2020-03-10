const express = require('express');
const router = express.Router();
const db = require('./database');
const checkAuth = require('./check_auth');

// get all jobs for students
// GET /jobs/all
router.get('/all', checkAuth, (req, res) => {
    let sqlGetJobs = 'SELECT * FROM jobs;';
    db.query(sqlGetJobs, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

router.post('/apply', checkAuth, (req, res) => {
    // req = { job_id, company_id, app_date, student_resume}
    const { user_id } = req.jwtData;
    const data = { student_id:user_id, ...req.body};
    let sqlPostApp = 'INSERT INTO job_applications SET ?;';
    db.query(sqlPostApp, data, (err, result) => {
        if(err) res.status(500).send(err);
        else {
            res.status(200).json({ msg: 'success', id: result['insertId'] });
        }
    });
});

module.exports = router;