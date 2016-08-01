const express = require('express');

module.exports = (app, passport) => {
  const router = new express.Router();

  router.get('/', (req, res) => {
    console.log('getting index');
    res.render('index', {title: 'Welcome to chat app'});
  });

  router.get('/chatrooms', isLoggedIn, (req, res) => {
    res.render('chatrooms', {title: 'Chatrooms', user: req.user});
  });

  // google auth

  router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
  router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/chatrooms',
    failureRedirect: '/'
  }));

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
  }

  app.use('/', router);
};
