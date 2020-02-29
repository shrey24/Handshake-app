const express = require('express');
const router = express.Router();
// const db = require('../../models');
const db = require('./database');

router.post('/todo', (req, res, next) => {
    console.log(req.body);
    db.Todo.create({
        text: req.body.text,
    }).then(submitedTodo => res.send(submitedTodo))
        .catch((err) => res.send("error, you sent: " + err));
});

module.exports = router;