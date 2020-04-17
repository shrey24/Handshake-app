const config = require('config');
const db_uri = config.get('mongoURI');

const config = {
    secret: "cmpe273_secret_key",
    frontendURL: "http://localhost:3000",
    mongoDB: db_uri
};

module.exports = config;