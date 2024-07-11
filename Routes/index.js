const express = require('express');
const router = express.Router();

const authRoutes = require('./auth'); 
const userRoutes = require('./user')
const activityRoutes = require('./activity')

router.use('/auth', authRoutes) // Using auth routes with '/auth' base path
router.use('/users', userRoutes) //using user routes with /users base path
router.use('/activity', activityRoutes)

module.exports = router;
