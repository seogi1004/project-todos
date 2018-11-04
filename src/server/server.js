const express = require('express');
// https://www.npmjs.com/package/morgan
const morgan = require('morgan');
// https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('../../webpack.config.js');
const compiler = webpack(config);

const mysql = require('./db/sqlite3');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
// hot reload
app.use(require("webpack-hot-middleware")(compiler));

// router
app.use('/todo', require('./router/todo'));

// 404 not found
app.all('*', (req, res) => {
    res.status(404);
});

process.on('exit', () => {
    mysql.end(() => {
        console.log("MySQL connection is closed.")
    });
});

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Express listening on port 3000!\n');
});
