const db = require('../config/db');
const crypto = require('crypto');

const generateLink = (req, res) => {
    const {file_id,expiry_minutes}=req.body;
    if (!file_id||!expiry_minutes) {
        return res.status(400).send("File ID and expiry time required");
    }
    const token=crypto.randomBytes(32).toString('hex');
    const tokenHash=crypto.createHash('sha256').update(token).digest('hex');
    const expiresAt=new Date(Date.now()+expiry_minutes*60000);
    db.query(
        "INSERT INTO download_links (file_id, token_hash, expires_at) VALUES (?, ?, ?)",[file_id, tokenHash, expiresAt],
        (err, result) => {
            if (err) {
                return res.status(500).send("Database error");
            }
            const downloadLink = `http://localhost:4000/download?token=${token}`;
            res.json({
                message: "Download link generated",
                link: downloadLink,
                expires_at: expiresAt
            });
        }
    );
};
module.exports={generateLink};
