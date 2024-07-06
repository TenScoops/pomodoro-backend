const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController')


const router = express.Router();

// Initialize Passport middleware (on the auth router)
router.use(passport.initialize());
router.use(passport.session());

// Passport Google OAuth strategy configuration
passport.use(authController.googleStrategy)

// Serialize and deserialize user (adjust if you store user data)
passport.serializeUser(authController.serializeUser);
passport.deserializeUser(authController.deserializeUser)

// Authentication routes
router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback', passport.authenticate('google', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    })
)

//on login success
router.get('/success', authController.loginSuccess)

//on login failure
router.get('/failure', authController.loginFailure)

//logout route
router.get('/logout', authController.logout)

//check authentication status
router.get('/status', authController.checkAuthStatus)

//get user info
router.get('/user', authController.getUser)

module.exports = router; 
