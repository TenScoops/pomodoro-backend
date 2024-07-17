const db = require('../db/database')
const GoogleStrategy = require('passport-google-oauth20').Strategy


const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback' // Use the full callback URL
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        
        const[rows] = await db.execute('SELECT * FROM users WHERE email = ?', [profile.emails[0].value])
        //if a user was found
        if(rows.length > 0) {
            return cb(null, rows[0])
        }else {
            //create new user
            const [result] = await db.execute('INSERT INTO users (email, name) VALUES (?, ?)', [profile.emails[0].value, profile.displayName])
            const [newUser] = await db.execute('SELECT * FROM users WHERE user_id = ?', [result.insertId])
            return cb(null, newUser[0])
        }

    } catch (err) {
        return cb(err, null)
    }
})

//When a user logs in, this function saves their user ID to the session
const serializeUser = function(user, cb) {
    cb(null, user.user_id)// Save user_id to the session
}

//this function uses the saved user ID to fetch the full user details from 
//the database and make them available in the request object (req.user)
const deserializeUser = async function(id, cb) {
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE user_id = ?', [id]);
        if (rows.length > 0) {
            cb(null, rows[0]);// Attach user object to req.user
        } else {
            cb(null, false);
        }
    } catch (err) {
        cb(err, null);
    }
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
        res.status(500).json({ isAuthenticated: false });
    }
}

const getUser = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            user_id: req.user.user_id,
            username: req.user.name,
            email: req.user.email,
            loggedIn: true
        });
    } else {
        res.json({ loggedIn: false });
    }
};

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