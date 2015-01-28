// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var YahooStrategy    = require('passport-yahoo-oauth').Strategy;
var WindowsLiveStrategy = require('passport-windowslive').Strategy;



// load up the user model
var User            = require('./../models/users');

// load the auth variables
var configAuth = require('./Oauth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session


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
                    return done(null, user);
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
        profileFields   : ['id', 'displayName', 'email', 'photos', 'gender', 'profileUrl'],
        passReqToCallback : true 
    },
    function(req, token, refreshToken, profile, done) {
        // asynchronous
        console.log('PROFILE FACEBOOK : ', profile);
        process.nextTick(function() {
            if (!req.user){
                User.findOne({ 'fb_infor.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (!user) {
                        // if there is no user, create them
                        var newUser                = new User();
                        newUser.newInforFb(token, profile, function(object){
                            return done(null, user); // user found, return that user
                        }); 
                    } else{
                        user.makeToken();
                        user.save(function(err){
                            return done(null, user);    
                        })
                    }
                });
            } else{
                var user            = req.user; // pull the user out of the session
                user.fb_infor.access_token = token;
                user.makeToken();
                user.save(function(err){
                    return done(null, user);    
                })
            }
        });
    }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, tokenSecret, profile, done) {
        console.log('PROFILE TWITTER : ', profile);
        console.log('TOKEN : ', token , ' ; tokenSecret : ', tokenSecret);
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
                        newUser.newInforTw(token, profile, function(user){
                            return done(null, newUser);
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
        console.log('PROFILE GOOGLE : ', profile);
        console.log('TOKEN : ', token , ' ; refreshToken : ', refreshToken);

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'google_infor.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
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

            } else {
                // user already exists and is logged in, we have to link accounts
                var user                = req.user; // pull the user out of the session
                user.access_token = token;
                user.makeToken();

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
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

      console.log(profile.emails[0].value);
      console.log('accessToken : ', accessToken);
      console.log('refreshToken : ', refreshToken);
      console.log('PROFILE LINKEDIN : ', profile);

      process.nextTick(function () {

        User.findOne({ 'linkedin_infor.id' : profile.id }, function(err, user) {
            if (err)
                return done(err);

            if (user) {

                // if there is a user id already but no token (user was linked at one point and then removed)
                if (!user.linkedin_infor.token) {
                    user.userName             = profile.displayName;
                    user.linkedin_infor.token = accessToken;
                    user.linkedin_infor.name  = profile.displayName;
                    user.linkedin_infor.email = profile.emails[0].value; // pull the first email

                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }

                return done(null, user);
            } else {
                var newUser                  = new User();
                newUser.userName             = profile.displayName;
                newUser.linkedin_infor.id    = profile.id;
                newUser.linkedin_infor.token = accessToken;
                newUser.linkedin_infor.name  = profile.displayName;
                newUser.linkedin_infor.email = profile.emails[0].value; // pull the first email

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
    // YAHOO ==================================================================
    // =========================================================================

    passport.use(new YahooStrategy({

          consumerKey      : configAuth.yahooAuth.consumerKey,
          consumerSecret   : configAuth.yahooAuth.consumerSecret,
          callbackURL      : configAuth.yahooAuth.callbackURL,

    }, function(token, tokenSecret, profile, done) {

      console.log('PROFILE : ', profile);

      process.nextTick(function () {

        User.findOne({ 'yahoo.id' : profile.id }, function(err, user) {
            if (err)
                return done(err);

            if (user) {

                // if there is a user id already but no token (user was linked at one point and then removed)
                if (!user.yahoo.token) {
                    user.yahoo.token = accessToken;
                    user.yahoo.name  = profile.displayName;
                    user.yahoo.email = profile.emails[0].value; // pull the first email

                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }

                return done(null, user);
            } else {
                var newUser          = new User();

                newUser.yahoo.id    = profile.id;
                newUser.yahoo.token = accessToken;
                newUser.yahoo.name  = profile.displayName;
                newUser.yahoo.email = profile.emails[0].value; // pull the first email

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
    // MICROSOFT ===============================================================
    // =========================================================================

    passport.use(new WindowsLiveStrategy({

          clientID       : configAuth.microsoftAuth.clientID,
          clientSecret   : configAuth.microsoftAuth.clientSecret,
          callbackURL    : configAuth.microsoftAuth.callbackURL,

    }, function(token, tokenSecret, profile, done) {

      console.log(profile);

      process.nextTick(function () {

        User.findOne({ 'microsoft.id' : profile.id }, function(err, user) {
            if (err)
                return done(err);

            if (user) {

                // if there is a user id already but no token (user was linked at one point and then removed)
                if (!user.microsoft.token) {
                    user.microsoft.token = token;
                    user.microsoft.name  = profile.displayName;
                    // user.microsoft.email = profile.emails[0].value; // pull the first email

                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }

                return done(null, user);
            } else {
                var newUser          = new User();

                newUser.microsoft.id    = profile.id;
                newUser.microsoft.token = token;
                newUser.microsoft.name  = profile.displayName;
                // newUser.microsoft.email = profile.emails[0].value; // pull the first email

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
      });
    }));
};





