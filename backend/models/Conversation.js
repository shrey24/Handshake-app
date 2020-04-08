const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: String, // from id
    time: Date,
    content: String,
});
const participantsSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    }, 
    avatar_path: {
        type: String,
        default: null
    }
});

const conversationSchema = new mongoose.Schema({
    participants_id : {
        type: [String],
        required: true
    },
    participants_details : [participantsSchema],
    messages: [messageSchema]
});

module.exports = conversation = mongoose.model('Conversation', conversationSchema);