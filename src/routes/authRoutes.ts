//Endpoints for authentication processes via passport
const passport = require('passport');

module.exports = (app) => {
  //endpoint for using Google authentication via passport
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    })
  );

  //endpoint for callback after Google authentication
  app.get('/auth/google/callback', passport.authenticate('google'));

  //endpoint for logging out
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  //endpoint to show current user for testing
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};