const mysql = require('mysql');
// const dotenv = require('dotenv').config();

const pool = mysql.createPool({
    host : process.env.DB_HOST || '127.0.0.1',
    user : process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Myroot@20',
    database: process.env.DB_NAME, 
    insecureAuth : true,
    debug: false,
    multipleStatements: true,
    connectionLimit: 100
});


// pool.getConnection((err, connection) => {
//     if(err){
//         if(err.code === 'PROTOCOL_CONNECTION_LOST'){
//             console.error('Database connection was closed.')
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('Database has too many connections.')
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.error('Database connection was refused.')
//         }
//     }

//     if(connection){
//         console.log("you are connected to db!!!!");
//         connection.release()
//     }
//     return;
// })

module.exports = pool;