const express = require('express');
const router = express.Router();
const { uploadFile, getFiles } = require('../controllers/uploadController');

router.post('/upload', uploadFile);
router.get('/files', getFiles);

module.exports = router;
