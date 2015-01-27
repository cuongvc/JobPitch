var request = require('request');


module.exports = function(app, passport) {

// normal routes ===============================================================

	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		console.log(req.user);
		res.render('profile.ejs', {
			user : req.user
		});
	});

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/login', function(req, res){
		res.render('index.ejs');
	})

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login_email', function(req, res) {
			res.render('login.ejs', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/login_email', passport.authenticate('local-login', {
			successRedirect : '/', // redirect to the secure profile section
			failureRedirect : '/login_email', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		app.get('/signup_email', function(req, res) {
			res.render('signup.ejs', { message: req.flash('loginMessage') });
		});

		// process the signup form
		app.post('/signup_email', passport.authenticate('local-signup', {
			successRedirect : '/', // redirect to the secure profile section
			failureRedirect : '/signup_email', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/',
				failureRedirect : '/'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

		// handle the callback after twitter has authenticated the user
		app.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : '/',
				failureRedirect : '/'
			}));

	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/',
				failureRedirect : '/'
			}));

	// linkedin ---------------------------------

		app.get('/auth/linkedin',
			  passport.authenticate('linkedin', { state: 'SOME STATE'  }));

		app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
			  successRedirect: '/',
			  failureRedirect: '/'
		}));

	// yahoo ---------------------------------

		app.get('/auth/yahoo',
			  passport.authenticate('yahoo'));

		app.get('/auth/yahoo/callback', passport.authenticate('yahoo', {
			  successRedirect: '/',
			  failureRedirect: '/'
		}));

	// microsoft ------------------------------

		app.get('/auth/microsoft',
		  passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic'] }));

		app.get('/auth/microsoft/callback', passport.authenticate('windowslive', {
			  successRedirect: '/',
			  failureRedirect: '/'
		}));
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}