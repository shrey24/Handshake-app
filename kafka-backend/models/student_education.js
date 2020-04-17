const mongoose = require('mongoose');

const student_edu_schema = new mongoose.Schema({
    college_name: {
        type: String,
        default: null
    },
    degree: {
        type: String,
        default: null
    },
    major: {
        type: String,
        default: null
    },
    start_date: {
        type: Number,
        default: null
    },
    end_date: {
        type: Number,
        default: null
    },
    gpa: {
        type: Number,
        default: null
    }
});

const student_education = mongoose.model('student_education', student_edu_schema);

module.exports = { student_education, student_edu_schema };