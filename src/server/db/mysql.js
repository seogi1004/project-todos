// https://www.npmjs.com/package/mysql
const mysql = require('promise-mysql');

// TODO 설정 파일외부로 뺄 것
const pool = mysql.createPool({
    host: 'antop.org',
    port: 32701,
    user: 'todo',
    password: 'Cv6re43sRsK7COij',
    database: 'todo',
    connectionLimit: 10
});

console.log("MySQL connection pool is created.");

module.exports = pool;
