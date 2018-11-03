const logger = require('node-color-log');
const express = require('express');
const router = express.Router();
// https://www.npmjs.com/package/uuid
const uuidv4 = require('uuid/v4');
const db = require('../db/sqlite3');

router.get('/', (req, res) => {

    db.all('select * from todos order by order_no desc', [], (err, rows) => {
        if (err) {
            logger.error(err);
            res.status(500).send(err);
            return;
        }

        const json = rows.map(v => {
            return {
                id: v['id'],
                title: v['title'],
                done: v['done'] == 1,
                order: v['order_no']
            };
        });

        res.json(json);
    });

});

router.post('/', (req, res) => {
    let id = uuidv4();
    let title = req.body.title;

    db.get('select ifnull(max(order_no), 0) as max_order from todos', [], (e, row) => {
        if (e) {
            logger.error(e);
            res.status(500).send(e);
            return;
        }

        let order = row['max_order'] + 1;

        db.run('insert into todos (id, title, order_no) values (?, ?, ?)', [id, title, order], function (e) {
            if (e) {
                logger.error(e);
                res.status(500).send(e.message);
                return;
            }

            res.json({
                id: id,
                title: title,
                done: false,
                order: order
            });
        })
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let done = req.body.done;
    let order = req.body.order;
    // update
    db.run('update todos set title=?, done=?, order_no=? where id=?', [title, done, order, id], e => {
        if (e) {
            logger.error(e);
            res.status(500).send(e.message);
            return;
        }

        res.json({});
    });

});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    // delete
    db.run('delete from todos where id=?', [id], e => {
        if (e) {
            logger.error(e);
            res.status(500).send(e.message);
            return;
        }

        res.json({});
    });

});

module.exports = router;
