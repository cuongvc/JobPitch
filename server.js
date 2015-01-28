var debug 						= 	require('debug')('JobPitch');
var express 					= 	require('express');
var app 							= 	express();
var favicon 					=  	require('serve-favicon');
var logger 						= 	require('morgan');
var cookieParser 			= 	require('cookie-parser');
var bodyParser 				= 	require('body-parser');
var mongoose        	=   require('mongoose');
var passport 					= 	require('passport');


var ip              	=   'localhost';
var port            	=   require('./config/default').port;
var db_url   					= 	require('./config/default').database;


// config router type
var Router_body 					=   express.Router();
var Router_formdata 			=   express.Router();
var routes 							  = require('./routes/index');

// ============================CONFIGURATION===================================

// connect to our database
mongoose.connect(db_url); 

require('./config/index.js')(app, Router_formdata, Router_body, passport);

app.get('/login_fb', function(req, res){
	res.render('login_fb.html');
})

// ============================ API ============================================


//  ----- LOGIN --------------------------
	require('./routes/login')(app, passport);

//  ----- UPLOAD PHOTO -------------------
	Router_formdata.post('/upload_photo', 	   routes.upload_photo);

//  ----- JOB ----------------------------
	Router_body.post('/create_job',  			 		 routes.job.create);
	Router_body.post('/edit_job',   			 		 routes.job.edit);
	Router_body.post('/job_detail',  			 		 routes.job.detail);

//  ------RECENT --------------------------
	Router_body.post('/recent',                routes.recent);


	

// =================================== LISTEN BY IP AND PORT ========================
app.set('port', process.env.PORT || port);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
