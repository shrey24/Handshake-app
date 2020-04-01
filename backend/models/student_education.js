const mongoose = require('mongoose');

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

const student_education = mongoose.model('student_education', student_edu_schema);

module.exports = { student_education, student_edu_schema };