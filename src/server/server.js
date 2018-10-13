const express = require('express');
// https://www.npmjs.com/package/morgan
const morgan = require('morgan');
// https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

// https://www.npmjs.com/package/mysql
const mysql = require('mysql');
// https://www.npmjs.com/package/uuid
const uuidv4 = require('uuid/v4');
// TODO 설정 파일외부로 뺄 것
const conn = mysql.createConnection({
    host: 'antop.org',
    port: 32701,
    user: 'todo',
    password: 'Cv6re43sRsK7COij',
    database : 'todo'
});

const config = require('../../webpack.config.js');
const compiler = webpack(config);

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
    extended: false
}));
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.get('/todo', (req, res) => {
    conn.query('select * from todos order by todo_order', function(error, results) {
        if (error) {
            res.status(500).send(error.sqlMessage);
            return;
        }
        const json = results.map(v => {
            return {
                id: v['todo_id'],
                title : v['todo_title'],
                complete : v['todo_complete'] === 1,
                order : v['todo_order']
            };
        });

        res.status(200).json(json);
    });
});

app.post('/todo', (req, res) => {

});

app.put('/todo/:id', (req, res) => {

});

app.delete('/todo/:id', (req, res) => {

});

process.on('exit', () => {
    conn.end(() => {
        console.log("MySQL connection is closed.")
    });
});

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});
