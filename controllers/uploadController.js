const multer = require('multer');
const path = require('path');
const db = require('../config/db');
const crypto = require('crypto');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'uploads/');
    },
    filename:function(req, file, cb) {
        const uniqueName=crypto.randomBytes(16).toString('hex');
        const extension=path.extname(file.originalname);
        cb(null,uniqueName+extension);
    }
});
const upload=multer({
    storage:storage,
    limits:{ fileSize: 5 * 1024 * 1024 } //5MB limit
}).single('file');
const uploadFile=(req, res) => {
    upload(req,res,function(err){
        if (err) {
            return res.status(400).send("File upload failed");
        }
        if (!req.file) {
            return res.status(400).send("No file selected");
        }
        const originalName = req.file.originalname;
        const storedName = req.file.filename;
        db.query(
            "INSERT INTO files (original_name, stored_name) VALUES (?, ?)",[originalName, storedName],
            (err, result) => {
                if (err) {
                    return res.status(500).send("Database error");
                }
                res.json({
                status: "success",
                message: "File uploaded successfully"
                });
            }
        );
    });
};
module.exports={uploadFile};
