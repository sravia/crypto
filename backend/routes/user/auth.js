var _ = require('lodash');
var express = require('express');
var app = express();
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = mongoose.model('User');


router.get('/profile', isLoggedIn, function(req, res){
  User.findOne({ '_id': req.user.id }, (err, user) => {
    if(err)
      return done(err);
    if(user){
      return res.status(200).send({ success: true, message:"Successfully retrieved!", user: user });
    }
  });
});

router.get('/authenticate', (req, res) => {
  if (req.isAuthenticated()) {
    var token = jwt.sign({_id: req.user.id}, process.env.JWT, {expiresIn: process.env.JWT_EXPIRE_TIME})
    return res.status(200).send({
      token: token,
      success: true,
      user: req.user
    });
  } else {
    return res.status(200).send({
      success: false
    })
  }
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, status) {
    if(user){
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        var token = jwt.sign({_id: req.user.id}, process.env.JWT, {expiresIn: process.env.JWT_EXPIRE_TIME});
        res.cookie('token', token)
        return res.status(200).send({
          token: 'JWT ' + token,
          status : status
        });
      });
    }else{
      console.log(status);
      res.status(200).send({
        status
      });
    }
  })(req, res, next);
});

router.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, status) {
    return res.status(200).send(status);
  })(req, res, next);
});


router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/'
  }));

router.get('/logout', (req, res) => {
  req.logout();
  return res.status(200).send();
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();

  res.redirect('/');
}

module.exports = router;
