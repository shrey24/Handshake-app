const mongoose = require('mongoose');

const student_exp = require('./student_experience');
const student_edu = require('./student_education');

const student_profile_schema = new mongoose.Schema({
    _id : mongoose.ObjectId, 
    student_profile: [{
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
        },
        name: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            default: null
        },
        career_objective: {
            type: String,
            default: null
        },
        address_city: {
            type: String,
            default: null
        },
        address_state: {
            type: String,
            default: null
        },
        address_country: {
            type: String,
            default: null
        },
        curr_university: {
            type: String,
            required: true
        },
        curr_major: {
            type: String,
            required: true
        },
        curr_degree: {
            type: String,
            default: null
        },
        edu_start: {
            type: Number,
            default: null
        },
        edu_end: {
            type: Number,
            required: true
        },
        gpa: {
            type: Number,
            default: null
        },
        avatar_path: {
            type: String,
            default: null
        },
        resume_path: {
            type: String,
            default: null
        }
    }],
    student_education: [student_edu.student_edu_schema],
    student_experience: [student_exp.student_exp_schema]
});

module.exports = student_profile = mongoose.model('student_profile', student_profile_schema);;