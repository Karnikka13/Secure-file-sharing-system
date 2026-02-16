const express = require('express');
const router = express.Router();
const { generateLink } = require('../controllers/linkController');

router.post('/generate-link', generateLink);

module.exports = router;
