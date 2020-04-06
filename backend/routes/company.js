const express = require('express');
const multer = require('multer');
const router = express.Router();
const checkAuth = require('./check_auth');
const company_profile = require('../models/company_profile');
const Job = require('../models/Job');

const APP_STATUS_PENDING = 'pending';
const APP_STATUS_REVIEWED = 'reviewed';
const APP_STATUS_DECLINE = 'declined';

// GET company/profile/[:company_id] or company/profile/[Me]
// NOTE: company_id is irrelevent if the request comes from a company
router.get('/profile/:company_id', checkAuth, async (req, res) => {
    let id = req.params.company_id;
    if( req.jwtData.user_type === 'company') {
        id = req.jwtData.user_id;
    }
    try {
        const profile = await company_profile.findById(id);
        console.log('dbresp: ', profile);
        if (!profile) {
            console.log(`'${id}' doesnot exists`);
            return res.status(400).json({ error:`company_id '${id}' doesnot exists` });
        }
        return res.status(200).json(profile);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

const storage = multer.diskStorage({
    destination: "./public/uploads/avatar/",
    filename: function(req, file, cb){
        // save as file name
        let extension = file.originalname.slice(file.originalname.indexOf('.'));
       cb(null, String(req.jwtData.user_id)+'-pic'+extension);
    }
 });
 // upload file middleware
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("userAvatar"); // field name

//> PUT /company/profile (update company profile)
// Updates info or profile_pic
router.put('/profile', checkAuth, upload, async (req, res) => {
    const user_id = req.jwtData.user_id;
    let data = req.body;
    if(req.file) {
        // store file path
        let path = req.file.path;
        var avatar_public_path = path.slice(path.indexOf('/'));
        data = {...data, avatar_path: avatar_public_path};
    }
    try {
        console.log('updating with new data', data);
        const dbResp = await company_profile.updateOne(
            { _id: user_id },
            { $set : { 'company_profile' : data } } 
            );
            console.log('dbResp', dbResp);
        
        return res.status(200).json({ 
            msg: 'success',  
            avatar_path: avatar_public_path || null 
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);        
    }
});

// get jobs posted by this company
router.get('/jobs', checkAuth, async (req, res) => {
    try {
        const dbResp = await Job.find(
            { company_id: req.jwtData.user_id }
        );
        console.log('jobs fetched: ', dbResp);
        return res.status(200).json(dbResp);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// add new job
router.post('/job', checkAuth, async (req, res) => {
    // insert company_id, company_name, avatar_path
    const { user_id } = req.jwtData;
    const data = { company_id: user_id, ...req.body };
    console.log('insert new job data:', data);
    try {
        const dbResp = await Job.create(data);
        console.log('dbResp: ', dbResp);
        return res.status(200).json({ msg: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


// !! TO CHECK AND VERIFY RESPONSE
// get applicaions of a job 
router.get('/applications/:job_id', checkAuth, async (req, res) => {
    try {
        const dbResp = await Job.find(
            { company_id: req.jwtData.user_id, _id: req.params.job_id},
            { job_applications: 1, _id: 0 }
        );
        console.log('applications fetched: ', dbResp);
        return res.status(200).json(dbResp.job_applications);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
    /*
    let sqlGetApps = 
    'SELECT * FROM job_applications ap INNER JOIN student_profile sp ON sp.user_id = ap.student_id WHERE ap.job_id = ?;';
    // const { user_id } = req.jwtData;
    const job_id = req.params.job_id;

    db.query(sqlGetApps, [job_id], (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
    */
});

// update application status
router.put('/applications', checkAuth, (req, res) => {
    // requires id (app_id) and app_status
    const { id, app_status } = req.body;
    console.log('req: ', req.body)
    let sqlUpdate = ' UPDATE job_applications SET app_status = ? WHERE id = ?;';
    // const { user_id } = req.jwtData;
    db.query(sqlUpdate, [app_status, id], (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});


module.exports = router;
