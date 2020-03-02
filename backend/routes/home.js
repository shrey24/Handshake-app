const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/todo', (req, res, next) => {
    db.Todo.findAll().then((todo) => res.send(todo));
    // res.status(200).json({
    //     message: "Handle GET req to /home",
    // });
});

router.post('/todo', (req, res, next) => {
    console.log(req.body);
    db.Todo.create({
        text: req.body.text,
    }).then(submitedTodo => res.send(submitedTodo))
        .catch((err) => res.send("error, you sent: " + err));
});

module.exports = router;