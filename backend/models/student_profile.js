const mongoose = require('mongoose');

const student_exp_schema = new mongoose.Schema({
    company_name: {
        type: String,
    },
    title: {
        type: String,
    },
    location: {
        type: String,
    },
    start_date: {
        type: Number,
    },
    end_date: {
        type: Number,
    },
    work_desc: {
        type: String,
    }
});

const student_edu_schema = new mongoose.Schema({
    college_name: {
        type: String,
    },
    degree: {
        type: String,
    },
    major: {
        type: String,
    },
    start_date: {
        type: Number,
    },
    end_date: {
        type: Number,
    },
    gpa: {
        type: Number,
    }
});

const student_profile_schema = new mongoose.Schema({
    _id : mongoose.ObjectId, 
    student_profile: [{
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        name: {
            type: String,
        },
        dob: {
            type: String,
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
        },
        curr_major: {
            type: String,
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
    student_education: [student_edu_schema],
    student_experience: [student_exp_schema]
});

module.exports = student_profile = mongoose.model('student_profile', student_profile_schema);