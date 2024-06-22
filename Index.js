require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();

const authRoutes = require('./Auth'); // Import authentication routes
const ratingRoutes = require('./Routes/RatingRoutes'); // Import rating routes

const corsOptions = {
    origin: 'http://localhost:3001', // Replace with your frontend URL
    credentials: true, // Allows cookies and session information to be shared across origins
}
app.use(cors(corsOptions))

// Configure express-session middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,  // Recommended to prevent client-side script access to the cookie
        sameSite: 'lax', // 'None' if you want to allow cookies to be sent in all contexts, 'lax' or 'strict' depending on your requirements
        secure: false    // false if HTTP
    }
}))

// Mount the authentication routes at '/auth' prefix
app.use('/auth', authRoutes);
// Mount rating routes under '/api'
app.use('/api', ratingRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
