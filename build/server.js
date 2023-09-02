"use strict";
const express = require("express");
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');
//Connect to MongoDB database
mongoose.connect(keys.MongoURI);
//Create express object for route handling
const app = express();
//Use cookieSession and passport middleware to generate 30-day cookies upon login
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
//Import authentication routes
require('./routes/authRoutes')(app);
//Start server on port 5000
app.listen(5000, () => {
    console.log("Server is up and running");
});
