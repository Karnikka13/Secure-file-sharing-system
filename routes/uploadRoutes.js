const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController');

router.post('/upload', uploadFile);
router.get('/files', (req, res) => {
    const db = require('../config/db');
    db.query("SELECT * FROM files", (err, results) => {
        if (err) return res.status(500).json([]);
        res.json(results);
    });
});

module.exports = router;
