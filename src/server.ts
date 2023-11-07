import express from 'express';
const keys = require('./config/keys');
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
require('./models/User');
require('./models/Food');
require('./services/passport');

//Connect to MongoDB database
mongoose.connect(keys.MongoURI);

//Create express object for route handling
const app = express();

//Use cookieSession and passport middleware to generate 30-day cookies upon login
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

//Import authentication routes
require('./routes/authRoutes')(app);

//Import food routes
require('./routes/foodRoutes')(app);

//IMPORTANT CODE FOR PRODUCTION - if no route is found on React app calls backend route
//TODO: Study this code
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}
//Start server on port 5000
app.listen(5000, () => {
  console.log("Server is up and running");
});