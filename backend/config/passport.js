var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

var User       = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        if (email){
            email = email.toLowerCase();
        }
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                if (err){
                    return done(err);
                }

                if (!user){
                    return done(null, false,{success: false, message:"user not found"});
                }

                if (!user.validPassword(password)){
                    return done(null, false,{success: false, message:"invalid password"});
                }else{
                    return done(null, user, {success: true});
                }
            });
        });

    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
        },
    function(req, email, password, done) {
        
        if (email){
            email = email.toLowerCase();
        }

        process.nextTick(function() {
            if (!req.user) {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, {success: false, message : "That email is already taken."});
                    } else {
                        var newUser            = new User();
                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save(function(err) {
                            if (err){
                                return done(err);
                            }
                            return done(null, newUser, {success: true});
                        });
                    }

                });
            } else {
                return done(null, {success: true, user:req.user});
            }

        });

    }));

    var fbStrategy = {
        'clientID'        : process.env.FACEBOOK_CLIENT_ID,
        'clientSecret'    : process.env.FACEBOOK_CLIENT_SECRET,
        'callbackURL'     : process.env.FACEBOOK_CALLBACK_URL,
        'profileURL': "https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email"
    };
    fbStrategy.passReqToCallback = true;
    passport.use(new FacebookStrategy(fbStrategy,
    function(req, token, refreshToken, profile, done) {

        process.nextTick(function() {
            if (!req.user) {
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        var newUser            = new User();
                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                var user            = req.user;

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }
        });

    }));
};
