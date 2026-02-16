Secure File Sharing System:
A locally hosted secure file management system that allows users to upload files and create time-limited download links.
The system strictly validates server-side expiry and records all download attempts for security auditing and monitoring.

Tech Stack:
i)Backend
	• Node.js
	• Express.js
	• MySQL
ii)Frontend
	• HTML
	• CSS 
	• JavaScript 
iii)Database
	• MySQL

Key Features:
	• Secure file upload with randomized filename storage
	• Generation of time-limited download links
	• 256-bit cryptographically secure token generation
	• SHA-256 token hashing before database storage
	• Custom server-side expiry validation logic
	• Download attempt logging (SUCCESS / FAILED)
	• Admin dashboard with log monitoring
	• Fully local execution

Flow Overview:
1.User uploads file.
2.File stored in secure local directory.
3.Metadata stored in database.
4.User generates time-limited link.
5.System:
	Generates secure token.
	Hashes token.
	Stores hashed token with expiry timestamp.
6.When link is accessed:
	Token is hashed.
	Compared with stored hash.
	Expiry validation executed.
	Access granted or denied.
7.Download attempt is logged.

How to Run the Project:
1.Clone repository
2.Install dependencies
	npm install
3.Configure Environment Variables: Create .env file
	DB_HOST=localhost
	DB_USER=root
	DB_PASSWORD=your_password
	DB_NAME=secure_files
	PORT=4000
4.Setup MySQL database using provided schema.
5.Start server
	node server.js
6.Open in browser:
	http://localhost:4000


