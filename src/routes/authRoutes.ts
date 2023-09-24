//Endpoints for authentication processes via passport
import { Express } from 'express';
import passport from 'passport';

module.exports = (app: Express) => {
  //endpoint for using Google authentication via passport
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    })
  );

  //endpoint for callback after Google authentication
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
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
};