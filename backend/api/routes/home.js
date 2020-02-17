const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handle GET req to /home",
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Handle POST req to /home",
    });
});

module.exports = router;