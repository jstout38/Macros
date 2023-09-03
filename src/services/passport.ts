import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import mongoose from 'mongoose';
const keys = require("../config/keys");

// Get user class from mongoose
const User = mongoose.model('users');

// Serialize user and get its MongoDB id
passport.serializeUser((user:any, done) => {
  done(null, user.id);
});

// Retrieve user from MongoDB id
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

//Google authentication logic using passport Google strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, async (accessToken, refreshToken, profile:any, done:any) => {
    //Check if there is existing user
    const existingUser = await User.findOne({ googleId: profile.id });
      //If user exists return existing user, else create new user in mongoose/MongoDB
      if (existingUser) {
        done(null, existingUser);
      } else {
          const user = await new User({ googleId: profile.id }).save()
          done(null, user);
      };    
    }
  )
);