const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/logs', (req, res) => {

    const query = `
        SELECT 
            files.original_name AS file_name,
            download_logs.status,
            download_logs.reason,
            download_logs.timestamp
        FROM download_logs
        JOIN download_links 
            ON download_logs.token_hash = download_links.token_hash
        JOIN files 
            ON download_links.file_id = files.id
        ORDER BY download_logs.timestamp DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json([]);
        }

        res.json(results);
    });
});

module.exports = router;
