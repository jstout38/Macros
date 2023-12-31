//Endpoints for authentication processes via passport
import { Express } from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
const User = mongoose.model('users');


module.exports = (app: Express) => {
  //endpoint for using Google authentication via passport
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    })
  );

//endpoint for callback after Google authentication
  app.get(
    '/auth/google/callback', passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  //endpoint for logging out
  app.get('/api/logout', (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
    res.redirect('/');
  });

  //endpoint to show current user for testing
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  //endpoint for adding additional info for account on registration or on update  
  app.put('/auth/user', async (req, res) => {
    const user = await User.findOneAndUpdate({ googleId: req.body.googleId },  
    {
      firstName: req.body.fields.formFirstName,
      lastName: req.body.fields.formLastName,
      email: req.body.fields.formEmail,
      weight: req.body.fields.formWeight,
      height: req.body.fields.formHeight,
      DoB: req.body.fields.formDOB,
      protein: req.body.fields.formProtein,
      carbs: req.body.fields.formCarbs,
      fat: req.body.fields.formFat,
      fiber: req.body.fields.formFiber,
      calories: req.body.fields.formCalories,
    }
    );
    user.save();
    res.send(user);
  });

};