var debug        										= 	require('debug')('JobPitch');
var express      										= 	require('express');
var app          										= 	express();
var favicon      										=  	require('serve-favicon');
var logger       										= 	require('morgan');
var cookieParser 										= 	require('cookie-parser');
var bodyParser   										= 	require('body-parser');
var mongoose     										=   require('mongoose');
var passport     										= 	require('passport');


var ip              								=   'localhost';
var port            								=   require('./config/default').port;
var db_url          								= 	require('./config/default').database;


// config router type
var Router_body     								=   express.Router();
var Router_formdata 								=   express.Router();
var routes          								=   require('./routes/index');

// ============================CONFIGURATION===================================

// connect to our database
mongoose.connect(db_url); 

require('./config/index.js')(app, Router_formdata, Router_body, passport);

app.get('/login_fb', function(req, res){
	res.render('login_fb.html');
})

	/*
	* index
	*/
	app.get('/',function(req,res){
		res.render('index.ejs');
	})
	app.get('/login',function(req,res){
		res.render('login.ejs');
	})
	/********************************************************************************/
										/*DIRECTIVE*/
	/********************************************************************************/
	app.get('/directive/home/header',function(req,res){
		res.render('directive/home/header.ejs');
	})
	app.get('/directive/home/create-job',function(req,res){
		res.render('directive/home/create-job.ejs');
	})
	app.get('/directive/home/footer',function(req,res){
		res.render('directive/home/footer.ejs');
	})
	app.get('/directive/home/jobs',function(req,res){
		res.render('directive/home/jobs.ejs');
	})
	app.get('/directive/home/profile',function(req,res){
		res.render('directive/home/profile.ejs');
	})
	app.get('/directive/home/tag-list',function(req,res){
		res.render('directive/home/tag-list.ejs');
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

//  ------APPLY --------------------------
	Router_body.post('/apply',                 routes.apply);

//  ------EDIT PROFILE --------------------------
	Router_body.post('/edit_profile',          routes.edit_profile);

//  ------MY JOBS --------------------------
	Router_body.post('/my_jobs',          		 routes.my_wall.my_jobs);
	Router_body.post('/my_applications',   		 routes.my_wall.my_applications);



// =================================== LISTEN BY IP AND PORT ========================

app.set('port', process.env.PORT || port);

if (process.argv[2] === 'dev') {
    console.log('development');
} else{
	  console.log('product');
}

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
