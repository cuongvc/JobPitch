var debug 						= 	require('debug')('JobPitch');
var express 					= 	require('express');
var app 							= 	express();
var favicon 					=  	require('serve-favicon');
var logger 						= 	require('morgan');
var cookieParser 			= 	require('cookie-parser');
var bodyParser 				= 	require('body-parser');
var mongoose        	=   require('mongoose');

var ip              	=   'localhost';
var port            	=   require('./config/default').port;
var db_url   					= 	require('./config/default').database;


// config router type
var Router_body 					=   express.Router();
var Router_formdata 			=   express.Router();

// ============================CONFIGURATION===================================

// connect to our database
mongoose.connect(db_url); 

require('./config/index.js')(app, Router_formdata, Router_body);

app.get('/login_fb', function(req, res){
	res.render('login_fb.html');
})

// ============================ API ============================================
var routes 						= require('./routes/index');

	// LOGIN
Router_body.post('/login/talent/facebook', routes.login.talent.facebook);
Router_body.post('/login/company/email', 	 routes.login.company.email);

	// SIGN UP
Router_body.post('/signup/company/email',  routes.signup.company.email);

	// LOG OUT
Router_body.post('/logout',  							 routes.logout);

  // CREATE JOB
Router_formdata.post('/create_job',  			 routes.job.create);


// =================================== LISTEN BY IP AND PORT ========================

app.set('port', process.env.PORT || port);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
