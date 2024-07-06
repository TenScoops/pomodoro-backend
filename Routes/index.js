const express = require('express');
const router = express.Router();

const authRoutes = require('./auth'); 

router.use('/auth', authRoutes); // Using auth routes with '/auth' base path

module.exports = router;
