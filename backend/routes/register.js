const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserAuth = require('../models/UserAuth');
const student_profile = require('../models/student_profile');
const company_profile = require('../models/company_profile');
const {user_types, USER_COMPANY, USER_STUDENT} = require('../config/datatypes');



const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

// Post: /register/student
router.post('/student', async (req, res) => {
    /*
        req: college, major, edu_end, name, email, password
    */
    console.log(req.body);
    const { email, name, password, curr_university, curr_major, curr_degree, edu_end, gpa } = req.body;
    const user_type = USER_STUDENT;

    try {
        let user = await UserAuth.findOne({ email });
        if(user) {            
            return res.status(400).json({ error: `user ${email} already exists` });
        }

        user = new UserAuth({
            email, 
            password: hashPassword(password), 
            user_type
        });

        const auth_result = await user.save();
        console.log(auth_result);
        
        let student = new student_profile({
            _id : auth_result._id,
            student_profile: [{
                email,
                name,
                curr_university,
                curr_major, 
                curr_degree, 
                edu_end, 
                gpa
            }]
        });

        const sp = await student.save();
        // create jwt token and send response
        const token = jwt.sign({
            email,
            user_id : auth_result._id,
            user_type : USER_STUDENT
            },
            process.env.JWT_KEY,
            { expiresIn: '2h' }
            );
        //Sucess, send a jwt token back
        return res.status(200).json({
            'msg': 'new student created',
            token,
            user: {
                email,
                user_id : auth_result._id,
                user_type : USER_STUDENT
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// Post: /register/company
router.post('/company', async (req, res) => {
    /*
        req: name, email, password, location
    */
    console.log(req.body);
    const { email, password, name, location } = req.body;
    const user_type = USER_COMPANY;
    try {
        let user = await UserAuth.findOne({ email });
        if(user) {            
            return res.status(400).json({ error: `email ${email} already exists` });
        }

        user = new UserAuth({
            email, 
            password: hashPassword(password), 
            user_type
        });

        const auth_result = await user.save();
        console.log(auth_result);
        
        let companyProfile = new company_profile({
            _id : auth_result._id,
            company_profile: {
                email,
                name, 
                location
            }
        });

        const dbResp = await companyProfile.save();

        // create jwt token and send response
        const token = jwt.sign({
            email,
            user_id : auth_result._id,
            user_type : USER_COMPANY
            },
            process.env.JWT_KEY,
            { expiresIn: '2h' }
            );
        //Sucess, send a jwt token back
        return res.status(200).json({
            'msg': 'new company created',
            token,
            user: {
                email,
                user_id : auth_result._id,
                user_type : USER_COMPANY
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;