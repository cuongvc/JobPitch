// load all the things we need
var LocalStrategy       = require('passport-local').Strategy;
var FacebookStrategy    = require('passport-facebook').Strategy;
var TwitterStrategy     = require('passport-twitter').Strategy;
var GoogleStrategy      = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy    = require('passport-linkedin-oauth2').Strategy;



// load up the user model
var User            = require('./../models/users');

// load the auth variables


module.exports = function(User_env, passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    if (User_env == 'dev'){
      var configAuth = require('./Oauth_development'); // use this one for testing  
    }  else{
      var configAuth = require('./Oauth'); // use this one for testing  
    }

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local_infor.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return user
                else{
                    user.makeToken();
                    user.save(function(err){
                        return done(null, user);    
                    })
                    
                }
            });
        });
    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {

            //  Whether we're signing up or connecting an account, we'll need
            //  to know if the email address is in use.
            User.findOne({'local_infor.email': email}, function(err, existingUser) {

                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if there's already a user with that email
                if (existingUser){
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                }

                //  If we're logged in, we're connecting a new local account.
                if(req.user) {
                    var user            = req.user;
                    user.local_infor.email    = email;
                    user.local_infor.password = user.generateHash(password);
                    user.makeToken();
                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }
                //  We're not logged in, so we're creating a brand new user.
                else {
                    // create the user
                    var newUser            = new User();

                    newUser.userName             = email;
                    newUser.local_infor.email    = email;
                    newUser.local_infor.password = newUser.generateHash(password);
                    newUser.makeToken();
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }

            });
        });

    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        passReqToCallback : true 
    },
    function(req, token, refreshToken, profile, done) {
        // asynchronous 
       process.nextTick(function() {
            // if (!req.user){
                User.findOne({$or : [{'fb_infor.id' : profile.id }, {'email' : profile.email}]}, function(err, user) {
                    if (err)
                        return done(err);

                    if (!user) {
                        // if there is no user, create them
                        var newUser                = new User();
                        newUser.newInforFb(token, profile, function(object){
                            return done(null, user); // user found, return that user
                        }); 
                        return;
                    } 

                    if (user.fb_infor.id == profile.id){
                        user.makeToken();
                        user.save(function(err){
                            return done(null, user);    
                        })
                    } else{
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    }
                });
            // } else{
                // var user            = req.user; // pull the user out of the session
            //     user.fb_infor.access_token = token;
            //     user.makeToken();
            //     user.save(function(err){
            //         return done(null, user);    
            //     })
            // }
        });
    }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true
    },
    function(req, token, tokenSecret, profile, done) {
        // asynchronous
        process.nextTick(function() {
            if (!req.user){
            // check if the user is already logged in
                User.findOne({ 'twitter_infor.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        user.twitter_infor.access_token       = token;
                        user.makeToken();
                        user.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, user);
                        });
                    } else {
                        // if there is no user, create them
                        var newUser                       = new User();
                        newUser.newInforTw(token, tokenSecret, profile, function(user){
                            return done(null, user);
                        })
                    }
                });

            } else{
                var user = req.user;
                user.twitter_infor.access_token = token;
                user.twitter_infor.token_secret = tokenSecret;
                user.makeToken();
                user.save(function(err){
                    return done(null, user);
                })
            }
            
        });

    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in

                User.findOne({$or : [{ 'google_infor.id' : profile.id }, {'email' : profile.email}]}, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        
                        if (user.google_infor.id != profile.id){
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        }

                        if (!user.google_infor.token) {
                            user.access_token = token;
                            user.makeToken();
                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        var newUser                = new User();
                        newUser.newInforGg(token, profile, function(user){
                            return done(null, newUser); 
                        })
                    }
                });
        });
    }));

    // =========================================================================
    // LINKEDIN ==================================================================
    // =========================================================================

    passport.use(new LinkedInStrategy({

          clientID      : configAuth.linkedinAuth.consumerKey,
          clientSecret  : configAuth.linkedinAuth.consumerSecret,
          callbackURL   : configAuth.linkedinAuth.callbackURL,
          scope         : ['r_emailaddress', 'r_basicprofile'],

    }, function(accessToken, refreshToken, profile, done) {

      console.log('accessToken : ', accessToken);
      console.log('PROFILE LINKEDIN : ', profile);

      process.nextTick(function () {

        User.findOne({$or : [{ 'linkedin_infor.id' : profile.id }, {'email' : profile.email}]}, function(err, user) {
            if (err)
                return done(err);

            if (user) {

                if (user.linkedin_infor.id != profile.id){
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                }

                user.linkedin_infor.access_token = accessToken;
                user.makeToken();
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            } else {
                var newUser                  = new User();
                newUser.newInforLk(accessToken, profile, function(user){
                        return done(null, newUser);
                });
                
            }
        });
      });
    }));


};





