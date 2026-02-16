const db = require('../config/db');

const logDownloadAttempt = (tokenHash, ip, status, reason) => {
    db.query(
        "INSERT INTO download_logs (token_hash, ip_address, status, reason) VALUES (?, ?, ?, ?)",
        [tokenHash, ip, status, reason],
        (err) => {
            if (err) {
                console.error("Logging failed:", err);
            }
        }
    );
};
module.exports={logDownloadAttempt};
