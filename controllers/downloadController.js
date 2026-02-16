const db = require('../config/db');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const {logDownloadAttempt}=require('../services/logService');

const downloadFile=(req, res)=>{
    const {token}=req.query;
    if (!token){
        return res.status(400).send("Token required");
    }

    const tokenHash=crypto.createHash('sha256')
        .update(token)
        .digest('hex');

    db.query(
        "SELECT * FROM download_links WHERE token_hash = ?", [tokenHash],
        (err,results)=>{
            if (err || results.length === 0) {
                logDownloadAttempt(tokenHash,req.ip,"FAILED","INVALID_TOKEN");
                return res.status(403).send("Invalid download link");
            }
            const linkData=results[0];
            const currentTime=new Date();

            if (currentTime>new Date(linkData.expires_at)) {
                logDownloadAttempt(tokenHash,req.ip,"FAILED","EXPIRED");
                return res.status(403).send("Link has expired");
            }
            db.query(
                "SELECT * FROM files WHERE id = ?",[linkData.file_id],
                (err, fileResults)=>{
                    if (err || fileResults.length === 0) {
                        logDownloadAttempt(tokenHash,req.ip,"FAILED","FILE_NOT_FOUND");
                        return res.status(404).send("File not found");
                    }
                    const file = fileResults[0];
                    const filePath = path.join(__dirname,'../uploads/',file.stored_name);

                    if (!fs.existsSync(filePath)) {
                        logDownloadAttempt(tokenHash, req.ip, "FAILED", "FILE_MISSING");
                        return res.status(404).send("File missing");
                    }
                    db.query(
                        "UPDATE download_links SET download_count = download_count+1 WHERE id=?",[linkData.id]
                    );
                    logDownloadAttempt(tokenHash,req.ip,"SUCCESS","DOWNLOAD_SUCCESS");
                    res.download(filePath,file.original_name);
                }
            );
        }
    );
};
module.exports={downloadFile};
