const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const student_profile = require('../models/student_profile');
const checkAuth = require('./check_auth');

let selectStudentSql = 'SELECT * FROM student_profile WHERE user_id = ?;';
let eduSql = 'SELECT * FROM student_education WHERE user_id = ?;';
let expSql = 'SELECT * FROM student_experience WHERE user_id = ?;';


//> /student-profile/:user_id
router.get('/:user_id', checkAuth, async (req, res) => {
    // console.log(req.body);
    let user_id = req.params.user_id;
    if(user_id === 'Me') user_id = req.jwtData.user_id;
    try {
        let profile = await student_profile.findOne({ _id:user_id });
        if(!profile) {
            return res.status(400).json({ error:`'${user_id}' doesnot exists` });
        }
        print(profile);
        res.status(200).json(profile);

    } catch (err) {
        console.log('error: ', err);
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
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("userAvatar"); // field name

//> PUT /student-profile (update student profile)
// Updates info or profile_pic
router.put('/', checkAuth, upload, (req, res) => {
    const user_id = req.jwtData.user_id;
    let data = req.body;
    if(req.file) {
        // store file path
        let path = req.file.path;
        var avatar_public_path = path.slice(path.indexOf('/'));
        data = {...data, avatar_path: avatar_public_path};
    }
    let updateProfileSql = 'UPDATE student_profile SET ? WHERE user_id = ?;';
    db.query(updateProfileSql, [data, user_id], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json({ msg: 'success', result: result, avatar_path: avatar_public_path || null });
        }
    });
});

//> POST /student-profile/education (add eduction)
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

//> PUT /student-profile/education/edu_id (update eduction)
router.put('/education/:id', checkAuth, (req, res) => {
    //  TODO check same user session
    let updateEduSql = 'UPDATE student_education SET ? WHERE id = ? AND user_id = ?;';
    const data = req.body;
    const id = Number(req.params.id);
    console.log(`update data for user id: ${id}`);
    console.log('data: ', data);    
    db.query(updateEduSql, [data, id, req.jwtData.user_id], (err, result) => {
        if(err) res.status(500).send(err);
        else {
            res.status(200).json({ msg: 'success', result: result });
        }
    });
});

//> DELETE /student-profile/education/edu_id (update eduction)
router.delete('/education/:id', checkAuth, (req, res) => {
    //  TODO check same user session
    let deleteEduSql = 'DELETE FROM student_education WHERE id = ? AND user_id = ?;';
    const id = req.params.id;
    db.query(deleteEduSql, [id, req.jwtData.user_id], (err, result) => {
        if(err) res.status(500).send(err);
        else {
            res.status(200).json({ msg: 'success', result: result });
        }
    });
});

const studentExp = require('../models/student_experience');
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
    const data = req.body;
    // const id = Number(req.params.id);
    console.log(`update data for user id: ${id}`);
    console.log('data: ', data); 
    
    try {
        const dbResp = await student_profile.updateOne(
            { _id: user_id, 'student_experience._id': req.params.id },
            { $set : { student_experience: data } }
        );
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err);        
    }
       
    db.query(updateEduSql, [data, id, req.jwtData.user_id], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json({ msg: 'success', result: result });
        }
    });
});

router.delete('/experience/:id', checkAuth, (req, res) => {
    //  TODO check same user session
    updateEduSql = 'DELETE FROM student_experience WHERE id = ? AND user_id = ?;';
    const id = Number(req.params.id);
    db.query(updateEduSql, [id, req.jwtData.user_id], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json({ msg: 'success', result: result });
        }
    });
});

module.exports = router;