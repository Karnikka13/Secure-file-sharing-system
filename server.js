const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

require('./config/db');
dotenv.config();

const uploadRoutes = require('./routes/uploadRoutes');
const linkRoutes = require('./routes/linkRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', uploadRoutes);
app.use('/', linkRoutes);
app.use('/', downloadRoutes);
app.use('/', logRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
