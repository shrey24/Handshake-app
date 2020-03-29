const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserAuth = require('../models/UserAuth');
const student_profile = require('../models/student_profile');
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
    const { email, password, curr_university, curr_major, curr_degree, edu_end, gpa } = req.body;
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
                curr_university,
                curr_major, 
                curr_degree, 
                edu_end, 
                gpa
            }]
        });

        const sp = await student.save();

        return res.json({msg: 'user registered', sp});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
    // check if user exists

    // save user_auth

    // create and save profile
/*
    db.query(selectSql, [email], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        }
        console.log(result);
        if (result.length !== 0) {
            res.status(500).json({
                error: `user ${email} already exists`
            });
        } else { // insert new user to user_auth table
            db.query(InsertSql, user_auth, (err, result, fields) => {
                if (err) {
                    res.status(500).send(err);
                    console.log(err);      
                } else {  
                    // insert new student to student_profile table                  
                    let insertStudentProfileSql = ' INSERT INTO student_profile SET ?; ';
                    let user_id = result['insertId'];
                    let student_profile_data = { user_id, email, curr_university, curr_major, curr_degree, edu_end, gpa };
                    db.query(insertStudentProfileSql, 
                        student_profile_data, (err, results) => {
                            if (err) {
                                res.status(500).send(err);
                                console.log(err);
                                return;    
                            }
                            console.log(results);

                            const token = jwt.sign({
                                email,
                                user_id : user_id,
                                user_type : 'student'
                                },
                                process.env.JWT_KEY,
                                { expiresIn: '1h' }
                                );
                            //Sucess, send a jwt token back
                            res.status(200).json({
                                'msg': 'new student created',
                                token,
                                user: {
                                    email,
                                    user_id : user_id,
                                    user_type : 'student'
                                }
                            });
                        });
                }
            });
        }
    });
    */
});



// Post: /register/student
router.post('/company', (req, res) => {
    /*
        req: name, email, password
    */
    console.log(req.body);
    const { email, password, name, location } = req.body;
    const user_type = user_types['company'];
    let user_auth = { 
                        email, 
                        password: hashPassword(password), 
                        user_type
                    };

    let selectSql= ` SELECT * FROM user_auth WHERE email = ?;`;
    let InsertSql = ' INSERT INTO user_auth SET ?; ';

    db.query(selectSql, [email], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        }
        console.log(result);
        if (result.length !== 0) {
            res.status(500).json({
                error: `user ${email} already exists`
            });
        } else { // insert new user to user_auth table
            db.query(InsertSql, user_auth, (err, result, fields) => {
                if (err) {
                    res.status(500).send(err);
                    console.log(err);      
                } else {  
                    // insert new company to company_profile table                  
                    let insertCompanyProfileSql = ' INSERT INTO company_profile SET ?; ';
                    let user_id = result['insertId'];
                    let profile_data = { user_id, email, name, location };
                    db.query(insertCompanyProfileSql, 
                        profile_data, (err, results) => {
                            if (err) {
                                res.status(500).send(err);
                                console.log(err);
                                return;    
                            }
                            console.log(results);

                            const token = jwt.sign({
                                email,
                                user_id : user_id,
                                user_type : 'company'
                                },
                                process.env.JWT_KEY,
                                { expiresIn: '1h' }
                                );
                            //Success, send a jwt token back
                            res.status(200).json({
                                'msg': 'new company created',
                                token,
                                user: {
                                    email,
                                    user_id : user_id,
                                    user_type : 'company'
                                }
                            });
                        });
                }
            });
        }
    });
});


/* // using sequelize
router.post('/', (req, res, next) => {
    console.log(req.body);
    const { email, password, type } = req.body;
    const userType = user_types;
    console.log(user_types);
    if ( !userType.hasOwnProperty(type) ){
        res.header(500).send(`user_type ${type} not supported`);
        return;
    }

    db.user_auth.create({
        email: email,
        password: password,
        user_type: userType[type]
    })
    .then(user => {
        console.log('user_auth entry success');
        const data = user.dataValues;
        if(data.user_type === userType['student']) { // create student profile
            const { email, name, university } = req.body;
            console.log('setting student profile...');
            db.student_profile.create({
                user_id : data.user_id,
                email: email,
                name: name,
                university: university
            })
            .then((profile) => {
                console.log('student_profile created successfully', profile);
                res.status(200).send(profile);
            })
            .catch((err) => res.send("error, student_profile NOT created. db_msg: " + err))
        }
        else if(user.user_type === userType['company']) {
            console.log('creating company profile...');
        }
        
    })
    .catch((err) => res.send("error, user_auth NOT created. you sent: " + err));
});
*/

module.exports = router;