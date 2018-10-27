const express = require('express');
const router = express.Router();
// https://www.npmjs.com/package/uuid
const uuidv4 = require('uuid/v4');
const mysql = require('../mysql');

router.get('/', (req, res) => {
    mysql.query('select * from todos order by todo_order desc', function (error, results) {
        if (error) {
            res.status(500).send(error.sqlMessage);
            return;
        }
        const json = results.map(v => {
            return {
                id: v['todo_id'],
                title: v['todo_title'],
                complete: v['todo_complete'] === 1,
                order: v['todo_order']
            };
        });

        res.status(200).json(json);
    });
});

router.post('/', (req, res) => {
    let id = uuidv4();
    let title = req.body.title;

    // get max order number
    mysql.query('select ifnull(max(todo_order), 0) as last_order from todos', function (error, results) {
        if (error) {
            res.status(500).send(error.sqlMessage);
            return;
        }

        let order = results[0]['last_order'] + 1;

        // insert
        mysql.query('insert into todos values (?, ?, 0, ?)', [id, title, order], function (error) {
            if (error) {
                res.status(500).send(error.sqlMessage);
                return;
            }

            res.status(200).json({
                id: id,
                title: title,
                complete: false,
                order: order
            });
        });

    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let complete = req.body.complete;
    // update
    mysql.query('update todos set todo_title=?, todo_complete=? where todo_id=?', [title, complete, id], function (error) {
        if (error) {
            res.status(500).send(error.sqlMessage);
            return;
        }

        res.status(200).json({});
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    // delete
    mysql.query('delete from todos where todo_id=?', [id], function (error) {
        if (error) {
            res.status(500).send(error.sqlMessage);
            return;
        }

        res.status(200).json({});
    });

});

module.exports = router;
