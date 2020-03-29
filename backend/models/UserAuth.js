const mongoose = require('mongoose');

const UserAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    }
});

// to add current date
// date: {
    // type: Date,
    // default: Date.now
// }

module.exports = UserAuth = mongoose.model('UserAuth', UserAuthSchema);
