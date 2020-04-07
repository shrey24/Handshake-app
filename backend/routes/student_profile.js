const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const student_profile = require('../models/student_profile');
const checkAuth = require('./check_auth');


//> /student-profile/:user_id
router.get('/:user_id', checkAuth, async (req, res) => {
    // console.log(req.body);
    let user_id = req.params.user_id;
    if(user_id === 'Me') user_id = req.jwtData.user_id;
    try {
        let profile = await student_profile.findOne(
            { _id:user_id },
            { 'student_profile._id': 0 }    
        );
        if(!profile) {
            return res.status(400).json({ error:`'${user_id}' doesnot exists` });
        }
        res.status(200).json(profile);

    } catch (err) {
        console.log('error: ', err);
        res.status(500).send(err);        
    }    
});

// declare multer middleware
const storage = multer.diskStorage({
    destination: "./public/uploads/avatar/",
    filename: function(req, file, cb){
        // save as file name
        let extension = file.originalname.slice(file.originalname.indexOf('.'));
       cb(null, String(req.jwtData.user_id)+'-pic'+extension);
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("userAvatar"); // field name

//> PUT /student-profile (update student profile)
// Updates info or profile_pic
router.put('/', checkAuth, upload, async (req, res) => {
    const user_id = req.jwtData.user_id;
    let data = req.body;

    if(req.file) {
        // store file path
        let path = req.file.path;
        var avatar_public_path = path.slice(path.indexOf('/')); // exclude public/ from path
        data = {...data, avatar_path: avatar_public_path};
    }
    console.log('updating with new data', data);
    
    try {
        const dbResp = await student_profile.updateOne(
            { _id: user_id },
            { $set : { 'student_profile' : [data] } } 
            // !note: due to [{data}] schema def, only this assignment will work
            // for student_profile array 
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

//> POST /student-profile/education (add eduction)
router.post('/education', checkAuth, async (req, res) => {
    const { college_name, degree, major, start_date, end_date, gpa } = req.body;
    const { user_id } = req.jwtData;
    const eduData = { user_id, college_name, degree, major, start_date, end_date, gpa };
    try {
        const dbResp = await student_profile.updateOne(
            { _id : user_id },
            { $push: { student_education : eduData} }
        );
        res.status(200).json({ msg: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//> PUT /student-profile/education/edu_id (update eduction)
router.put('/education/:id', checkAuth, async (req, res) => {    
    const data = req.body;
    const { user_id } = req.jwtData;
    console.log('data: ', data);    
    try {
        const dbResp = await student_profile.updateOne(
            { _id : user_id, 'student_education._id' : req.params.id },
            { $set: { 'student_education.$' : data } }
        );
        console.log(dbResp);        
        res.status(200).json({ msg: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//> DELETE /student-profile/education/edu_id (update eduction)
router.delete('/education/:id', checkAuth, async (req, res) => {
    const id = req.params.id;
    const { user_id } = req.jwtData;

    try {
        const dbResp = await student_profile.updateOne(
            {_id: user_id },
            { $pull: { student_education: { _id: id } } }
        );
        console.log(dbResp);        
        if (dbResp.nModified === 0) {
            return res.status(401).json({ msg: 'no doc modified. url param <id> doesnot exists'});
        }
        return res.status(200).json({ msg: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//> POST /student-profile/experience/ (add eduction)
router.post('/experience', checkAuth, async (req, res) => {
    const { company_name, title, location, start_date, end_date, work_desc } = req.body;
    const { user_id } = req.jwtData;
    const data = { company_name, title, location, start_date, end_date, work_desc };
    try {
        console.log('inserting data: ', data);
        const dbResp = await student_profile.updateOne(
            { _id: user_id },
            { $push : { student_experience: data } }
        );        
        res.status(200).json({ msg: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//> PUT /student-profile/experience/exp_id (update eduction)
router.put('/experience/:id', checkAuth, async (req, res) => {
    let data = req.body;
    let exp_id = req.params.id;
    data = { ...data, _id:exp_id };
    console.log(`update data for user id: ${req.jwtData.user_id}`);
    console.log('data: ', data); 
    
    try {
        const dbResp = await student_profile.updateOne(
            { _id: req.jwtData.user_id, 'student_experience._id': exp_id },
            { $set : { 'student_experience.$' : data } }
        );
        console.log('dbResp', dbResp);
        
        return res.status(200).json({ 'msg': 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);        
    }
});

router.delete('/experience/:id', checkAuth, async (req, res) => {
    const id = req.params.id;
    const { user_id } = req.jwtData;
    try {
        const dbResp = await student_profile.updateOne(
            {_id: user_id },
            { $pull: { student_experience: { _id: id } } }
        );
        console.log(dbResp);        
        if (dbResp.nModified === 0) {
            return res.status(401).json({ msg: 'no doc modified. url param <id> doesnot exists'});
        }
        return res.status(200).json({ msg: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;