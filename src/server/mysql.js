// https://www.npmjs.com/package/mysql
const mysql = require('mysql');

// TODO 설정 파일외부로 뺄 것
const conn = mysql.createConnection({
    host: 'antop.org',
    port: 32701,
    user: 'todo',
    password: 'Cv6re43sRsK7COij',
    database: 'todo'
});

console.log("MySQL connection is opened.")

module.exports = conn;
