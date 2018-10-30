const express = require('express');
const router = express.Router();
// https://www.npmjs.com/package/uuid
const uuidv4 = require('uuid/v4');
const mysql = require('../db/mysql');

router.get('/', (req, res) => {
    mysql.query('select * from todos order by todo_order desc')
        .then(rows => {
            const json = rows.map(v => {
                return {
                    id: v['todo_id'],
                    title: v['todo_title'],
                    done: v['todo_complete'] === 1,
                    order: v['todo_order']
                };
            });

            res.status(200).json(json);
        })
        .catch(e => {
            res.status(500).send(e.sqlMessage);
        });
});

router.post('/', (req, res) => {
    let id = uuidv4();
    let title = req.body.title;

    // get max order number
    mysql.query('select ifnull(max(todo_order), 0) as last_order from todos')
        .then(rows => {
            let order = rows[0]['last_order'] + 1;
            // insert
            mysql.query('insert into todos values (?, ?, 0, ?)', [id, title, order])
                .then(() => {
                    res.status(200).json({
                        id: id,
                        title: title,
                        done: false,
                        order: order
                    });
                })
                .catch(e => {
                    res.status(500).send(e.sqlMessage)
                });
        })
        .catch(e => {
            res.status(500).send(e.sqlMessage)
        });

});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let done = req.body.done;
    // update

    mysql.query('update todos set todo_title=?, todo_complete=? where todo_id=?', [title, done, id])
        .then(() => {
            res.status(200).json({});
        })
        .catch(e => {
            res.status(500).send(e.sqlMessage)
        });

});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    // delete
    mysql.query('delete from todos where todo_id=?', [id])
        .then(() => {
            res.status(200).json({});
        })
        .catch(e => {
            res.status(500).send(e.sqlMessage)
        });
});

module.exports = router;
