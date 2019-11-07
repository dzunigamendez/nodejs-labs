const express = require('express');
const users = require('./users');
const keywords = require('./keywords');

const router = express.Router();

router.use('/users', users);
router.use('/keywords', keywords);

module.exports = router;
