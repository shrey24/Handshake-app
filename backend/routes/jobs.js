const express = require('express');
const router = express.Router();
const db = require('./database');
const checkAuth = require('./check_auth');
const path = require('path');
const multer = require('multer');

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


const storage = multer.diskStorage({
    destination: "./public/uploads/resume/",
    filename: function(req, file, cb){
        // save as file name
        let extension = file.originalname.slice(file.originalname.indexOf('.'));
       cb(null, String(req.body.job_id)+'-'+String(req.jwtData.user_id)+extension);
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("file"); // field name

//> POST /jobs/apply
router.post('/apply', checkAuth, upload, (req, res) => {
    // req = { job_id, company_id, app_date, student_resume}
    if (!req.file) { // no resume, send error
        res.status(400).json({error: 'No resume attached'});
        return;
    }
    // prepare data to be inserted
    const { user_id } = req.jwtData;
    let path = req.file.path;
    var resume_public_path = path.slice(path.indexOf('/')); // remove '/public' from path
    const data = {  
        student_id:user_id,
        student_resume: resume_public_path,
         ...req.body
        };    
    console.log('data received: ', req.body);
    
    // check if already applied
    let sqlSelect = 'SELECT * FROM job_applications WHERE job_id=? AND student_id=? ;';
    db.query(sqlSelect, [data.job_id, data.student_id], (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else if( results.length > 0) {
            console.log("Already applied: ", results);
            res.status(400).json({error: 'already applied!'});
        } else { 
            // create new application row
            let sqlPostApp = 'INSERT INTO job_applications SET ?;';
            db.query(sqlPostApp, data, (err, result) => {
                if(err) {
                    console.log(err);            
                    res.status(500).send(err);
                } else {
                    res.status(200).json({ msg: 'Application submitted!', id: result['insertId'] });
                }
            });
        }
    });

});

module.exports = router;