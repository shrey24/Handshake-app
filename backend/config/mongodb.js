const mongoose = require('mongoose');
const config = require('config');
const db_uri = config.get('mongoURI');

var options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

const connectDB = async () => {
    try {
        await mongoose.connect(db_uri, options);
        console.log(`MongoDB Connected!!`);
    } catch (err) {
        console.err(err.message);
        console.log(`MongoDB Connection Failed`);
    }
}

// mongoose.connect(db_uri, options, (err, res) => {
//     if (err) {
//         console.log(err);
//         console.log(`MongoDB Connection Failed`);
//     } else {
//         console.log(`MongoDB Connected`);
//     }
// });

module.exports = connectDB;