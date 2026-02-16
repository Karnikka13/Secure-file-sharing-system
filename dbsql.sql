CREATE DATABASE secure_files;
USE secure_files;

CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_name VARCHAR(255),
    stored_name VARCHAR(255),
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
select * from files;
CREATE TABLE download_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_id INT,
    token_hash VARCHAR(255),
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    download_count INT DEFAULT 0,
    FOREIGN KEY (file_id) REFERENCES files(id)
);
select * from download_links;
CREATE TABLE download_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token_hash VARCHAR(255),
    ip_address VARCHAR(100),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    reason VARCHAR(255)
);
SELECT * FROM download_logs;
