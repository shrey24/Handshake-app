const express = require('express');
const router = express.Router();
const db = require('./database');
const checkAuth = require('./check_auth');
const path = require('path');
// const multer = require('multer');

// get all events for students or created events for companies
// GET /events/all
router.get('/all', checkAuth, (req, res) => {

    if(req.jwtData.user_type === 'company') {
        let sqlGetEvents = 'SELECT * FROM events WHERE company_id = ?;';
        db.query(sqlGetEvents, req.jwtData.user_id, (err, results) => {
            if(err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(results);
            }
        });

    } else {
        let sqlGetEvents = 'SELECT * FROM events;';
        db.query(sqlGetEvents, (err, results) => {
            if(err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(results);
            }
        });
    }
});

// GET /events/:event_id
router.get('/:event_id', checkAuth, (req, res) => {
    let getApps = `SELECT * FROM events WHERE id = ?;`;
    
    db.query(getApps, [req.params.event_id], (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });

});

// post new event
router.post('/', checkAuth, (req, res) => {
    // event_name , desc, date_time, event_major, company_name, company_avatar
    const data = {...req.body, company_id : req.jwtData.user_id};
    let sqlInsert = 'INSERT INTO events SET ?;';
    db.query(sqlInsert, data, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json({ msg: 'success', id: result['insertId'] });
        }
    });
});

// rsvp to event_rsvp
router.post('/rsvp', checkAuth, (req, res) => {
    // event_name , event_id, student_name, student_avatar
    const data = {...req.body, student_id : req.jwtData.user_id};
    let sqlInsert = 'INSERT INTO event_rsvp SET ?;';
    db.query(sqlInsert, data, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json({ msg: 'success', id: result['insertId'] });
        }
    });
});

// student get registered events
router.get('/rsvp', checkAuth, (req, res) => {
    // event_name , event_id
    const data = {...req.body, student_id : req.jwtData.user_id};
    let cols = '*';
    let getApps = `SELECT ${cols} FROM event_rsvp er INNER JOIN events es ON er.event_id = js.id WHERE er.student_id = ?;`;
    
    db.query(getApps, [req.jwtData.user_id], (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

// company get student registerations
// GET /events/students/:event_id
router.get('/students/:event_id', checkAuth, (req, res) => {
    console.log('get e_id', req.params.event_id);
    
    // event_name , event_id
    let cols = '*';
    let getApps = `SELECT ${cols} FROM event_rsvp er INNER JOIN events es ON er.event_id = es.id WHERE er.id = ?;`;
    
    db.query(getApps, [req.params.event_id], (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});



module.exports = router;