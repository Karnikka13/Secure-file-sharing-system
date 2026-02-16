const db = require('../config/db');

const getLogs = (req, res) => {
    const query = `
        SELECT 
            files.original_name AS file_name,
            download_logs.status,
            download_logs.reason,
            download_logs.timestamp
            FROM download_logs
            LEFT JOIN download_links 
            ON download_logs.token_hash=download_links.token_hash
            LEFT JOIN files 
            ON download_links.file_id = files.id
            ORDER BY download_logs.timestamp DESC
    `;
    db.query(query,(err,results)=>{
        if(err){
            console.error("Error fetching logs:", err);
            return res.status(500).json({
                status: "error",
                message: "Failed to fetch logs"
            });
        }
        res.json({
            status:"success",
            count:results.length,
            data:results
        });
    });
};
module.exports={getLogs};
