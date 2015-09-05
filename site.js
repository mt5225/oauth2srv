/**
 * Module dependencies.
 */
var passport = require('passport');
var login = require('connect-ensure-login');


exports.index = function(req, res) {
  res.send('OAuth 2.0 Server');
};

exports.loginForm = function(req, res) {
  res.render('wx');
};

exports.login = passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/fail' });

exports.apilogin = passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/fail' });

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.account = [
  login.ensureLoggedIn(),
  function(req, res) {
    res.render('account', { user: req.user });
  }
];
