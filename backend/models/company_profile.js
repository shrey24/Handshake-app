const mongoose = require('mongoose');

const company_profile_schema = new mongoose.Schema({
    _id : mongoose.ObjectId, 
    company_profile: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            default: null
        },
        location: {
            type: String,
            default: null
        },
        website: {
            type: String,
            default: null
        },
        avatar_path: {
            type: String,
            default: null
        },
        company_desc: {
            type: String,
            default: null
        }
    }
});

module.exports = company_profile = mongoose.model('company_profile', company_profile_schema);