const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const router = express.Router();

// Initialize Passport middleware (on the auth router)
router.use(passport.initialize());
router.use(passport.session());

// Passport Google OAuth strategy configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback' // Use the full callback URL
},
function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null, profile);
}));

// Serialize and deserialize user (adjust if you store user data)
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(user, cb) {
    cb(null, user); 
});





// Authentication routes
router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    })
);

//on login success
router.get('/success', (req, res) => {
    res.redirect('http://localhost:3001')
});

//on login failure
router.get('/failure', (req, res) => {
    res.status(401).send('Authentication failed');
});


router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Failed to logout');
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Internal server error');
            }
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.status(200).send('Logged out'); // Respond without redirecting
        });
    });
});



router.get('/status', (req, res) => {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
      // If authenticated, send status 200 and isAuthenticated as true
      res.status(200).json({ isAuthenticated: true });
    } else {
      // If not authenticated, send status 200 and isAuthenticated as false
      res.status(200).json({ isAuthenticated: false });
    }
  });

  router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ username: req.user.displayName, loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});


module.exports = router; 
