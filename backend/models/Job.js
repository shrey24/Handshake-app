const mongoose = require('mongoose');
const config = require('config');
const app_status = config.get("app_status");
// student_profile schema can have job_ids for faster lookup

const job_applications_schema  = new mongoose.Schema({
    _id : mongoose.ObjectId,
    student_id: {
        type: String,
        required: true
    },
    app_date: {
        type: String,
        required: true
    },
    student_resume: {
        type: String,
        required: true
    },
    app_status: {
        type: String,
        default: app_status.APP_STATUS_PENDING
    }
});

const job_schema = new mongoose.Schema({
    company_id: {
        type: String,
        required: true
    },
    job_title: {
        type: String,
        required: true
    },
    job_location: {
        type: String,
        default: null
    },
    deadline: {
        type: String,
        default: null
    },
    salary: {
        type: Number,
        default: null
    },
    job_desc: {
        type: String,
        default: 'Job description to be declared soon'
    },
    job_catagory: {
        type: String,
        required: true
    },
    post_date: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    job_applications: [job_applications_schema]
});

module.exports = Job = mongoose.model('Job', job_schema);