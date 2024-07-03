const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const router = express.Router();

// Initialize Passport middleware (on the auth router)
router.use(passport.initialize());
router.use(passport.session());

// Passport Google OAuth strategy configuration
passport.use(AuthController.GoogleStrategy)

// Serialize and deserialize user (adjust if you store user data)
passport.serializeUser(AuthController.serializeUser);
passport.deserializeUser(AuthController.deserializeUser)

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
router.get('/success', AuthController.loginSuccess)

//on login failure
router.get('/failure', AuthController.loginFailure)

//logout route
router.get('/logout', AuthController.logout)

//check authentication status
router.get('/status', AuthController.checkAuthStatus)

//get user info
router.get('/user', AuthController.getUser)

module.exports = router; 
