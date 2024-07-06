const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy




const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback' // Use the full callback URL
}, async (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile)
})

const serializeUser = function(user, cb) {
    cb(null, user)
}

const deserializeUser = function(user, cb) {
    cb(null, user);
}

const loginSuccess = (req, res) => {
    res.redirect('http://localhost:3001');
}

const loginFailure = (req, res) => {
    res.status(401).send('Authentication failed');
}

const logout = (req, res) => {
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
        })
    })
}

const checkAuthStatus = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ isAuthenticated: true });
    } else {
        res.status(200).json({ isAuthenticated: false });
    }
}

const getUser = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ username: req.user.displayName, loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
}

module.exports = {
    googleStrategy,
    serializeUser,
    deserializeUser,
    loginSuccess,
    loginFailure,
    logout,
    checkAuthStatus,
    getUser
}