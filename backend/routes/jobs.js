const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const checkAuth = require('./check_auth');
const path = require('path');
const multer = require('multer');
const kafka = require('../kafka/client');
// get all jobs for students
// GET /jobs/all
router.get('/all', checkAuth, async (req, res) => {
    kafka.make_request('jobs', req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            });
        }else{
            console.log("Inside else");
            console.log('jobs fetched: ', results);
            res.status(200).json(results);
            res.end();
        }
    });

    // try {
    //     const dbResp = await Job.find(
    //         { },
    //         { job_applications: 0 }
    //     );
    //     console.log('jobs fetched: ', dbResp);
    //     return res.status(200).json(dbResp);
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).send(err);
    // }
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
// req params: job_id, company_id, app_date, file (student_resume)
router.post('/apply', checkAuth, upload, async (req, res) => {
    console.log('data received: ', req.body);
    if (!req.file) { // no resume, send error
        return res.status(400).json({error: 'No resume attached'});
    }
    // prepare data to be inserted
    const { user_id } = req.jwtData;
    const { job_id, app_date, ...studentProfile} = req.body;
    let path = req.file.path;
    var resume_public_path = path.slice(path.indexOf('/')); // remove '/public' from path
    console.log('studentProfile: ',typeof studentProfile, studentProfile)

    const data = {  
        student_id:user_id,
        student_resume: resume_public_path,  
        app_date,
        ...studentProfile
        };    
        console.log('data: ',typeof data, data);
    try {
        // check if already applied 
        const result = await Job.findOne( { _id:job_id, 'job_applications.student_id': user_id });
        if (result) {
            console.log("Already applied: ", result);
            return res.status(400).json({error: 'already applied!'});
        }
        const dbResp = await Job.updateOne(
            { _id: job_id },
            { $push: { job_applications: data } }
        );
        console.log('dbResp: ', dbResp);
        return res.status(200).json({ msg: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);        
    }
});

// GET /jobs/aplications  
// get applications for a student
router.get('/applications', checkAuth, async (req, res) => {
    let cols = 'ap.id, ap.company_id, ap.job_id, ap.app_date, ap.app_status, jt.company_name, jt.job_location, jt.job_title, cp.avatar_path';
    try {
        const dbResp = await Job.find(
            {'job_applications.student_id': req.jwtData.user_id },
            { 
                job_applications: {$elemMatch: { student_id: req.jwtData.user_id } },
                job_location:0, salary:0, job_desc:0, deadline:0 
            }
        );
        console.log(dbResp);
        return res.status(200).json(dbResp);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);        
    }
});

module.exports = router;