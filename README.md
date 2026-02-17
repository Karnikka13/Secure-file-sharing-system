# 🔐 Secure File Sharing System

A locally hosted secure file management system that allows users to
upload files and create time-limited download links. The system strictly
validates server-side expiry and records all download attempts for
security auditing and monitoring.

------------------------------------------------------------------------

## 🛠 Tech Stack

### Backend

-   Node.js
-   Express.js
-   MySQL

### Frontend

-   HTML
-   CSS
-   JavaScript

### Database

-   MySQL

------------------------------------------------------------------------

## 🚀 Key Features

-   Secure file upload with randomized filename storage
-   Generation of time-limited download links
-   256-bit cryptographically secure token generation
-   SHA-256 token hashing before database storage
-   Custom server-side expiry validation logic
-   Download attempt logging (SUCCESS / FAILED)
-   Admin dashboard with log monitoring
-   Fully local execution

------------------------------------------------------------------------

## 🔄 Flow Overview

1.  User uploads file
2.  File stored in secure local directory (`/uploads`)
3.  Metadata stored in MySQL database
4.  User generates time-limited download link
5.  System:
    -   Generates secure random token
    -   Hashes token using SHA-256
    -   Stores hashed token with expiry timestamp
6.  When link is accessed:
    -   Token is hashed again
    -   Compared with stored hash
    -   Expiry validation executed
    -   Access granted or denied
7.  Download attempt is logged in database

------------------------------------------------------------------------

## 🔐 Security Implementation

-   Cryptographically secure random token generation
-   SHA-256 hashing of tokens before database storage
-   Server-side expiry validation
-   Files stored outside public directory
-   No direct file access without validation
-   All download attempts logged for audit

------------------------------------------------------------------------

## 🗄 Database Schema

### files

-   id (Primary Key)
-   original_name
-   stored_name
-   uploaded_at

### download_links

-   id (Primary Key)
-   file_id (Foreign Key)
-   token_hash
-   expires_at
-   download_count

### download_logs

-   id (Primary Key)
-   token_hash
-   status
-   reason
-   timestamp

------------------------------------------------------------------------

## 🖥 How to Run the Project

1.  Clone repository

2.  Install dependencies

        npm install

3.  Configure Environment Variables
    Create a `.env` file:

        DB_HOST=localhost  
        DB_USER=root  
        DB_PASSWORD=your_password  
        DB_NAME=secure_files  
        PORT=4000  

4.  Setup MySQL database using provided schema

5.  Start server

        node server.js

6.  Open in browser

        http://localhost:4000
