var express = require('express');
var itemsModule = require('../steam/items.js')
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function (passport) {

  /* GET login page. */
  router.get('/', function (req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', {message: req.flash('message')});
  });

  /* GET Home Page */
  router.get('/home', isAuthenticated, function (req, res) {
    itemsModule();
    itemsModule.getItems(req.user.steam.openId, function(data) {
      var userItems = data.result.items;
      console.log("index.js", userItems[0]);
      res.render('home', {user: req.user, items: userItems});
    });
  });

  /* Handle Logout */
  router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/auth/steam', passport.authenticate('steam'));

  router.get('/auth/steam/return',
      passport.authenticate('steam', {
        successRedirect: '/home',
        failureRedirect: '/'
      }));

  return router;
}