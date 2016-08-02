const express = require('express');
const _ = require('underscore');

module.exports = (app, passport, rooms) => {
  const router = new express.Router();

  router.get('/', (req, res) => {
    res.render('index', {title: 'Welcome to chat app'});
  });

  router.get('/chatrooms', isLoggedIn, (req, res) => {
    res.render('chatrooms', {title: 'Chatrooms', user: req.user});
  });

  router.get('/room/:id', isLoggedIn, (req, res) => {
    const roomName = findRoomById(req.params.id);
    res.render('room', {user: req.user, roomNumber: req.params.id, roomName: roomName});
  });

  function findRoomById(roomId) {
    const room = _.findWhere(rooms, {roomNumber: parseInt(roomId, 10)});
    return room.roomName;
  }

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
