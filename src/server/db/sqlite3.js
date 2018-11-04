const logger = require('node-color-log');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'todos.db');

let db = new sqlite3.Database(dbPath, err => {
    if (err) {
        logger.error(err);
        process.exit(1);
    }

    logger.info(`Connected to the Todos database. ${dbPath}`);
});

module.exports = db;
