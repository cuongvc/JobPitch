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
var Router_subdomain								=   express.Router();

var routes          								=   require('./routes/index');

var User                            =   require('./models/users');
var Job                             =   require('./models/jobs');
var Permalink 										  = 	require('./models/permalinks');



// ============================CONFIGURATION===================================

// connect to our database
mongoose.connect(db_url); 

require('./config/index.js')(app, Router_formdata, Router_body, Router_subdomain, passport);

app.get('/login_fb', function(req, res){
	res.render('login_fb.html');
})

/*
* index
*/
var DIRECTIVE_URL = ['/','/user/:user_id','/user','/u/:user_id','/pdf/job/:job_id','/job/:job_id','/search/:query'];
app.get(DIRECTIVE_URL,function(req, res){
	res.render('template.ejs',{user: req.user});
})
app.get('/',function(req,res){
	res.render('index.ejs',{user: req.user});
})
app.get('/login',function(req,res){
	res.render('login.ejs');
})
app.get('/signup',function(req,res){
	res.render('signup.ejs');
})
app.get('/forgot-password',function(req,res){
	res.render('forgot-password.ejs');
})
app.get('/export-pdf/:pitch_id',function(req,res){
	res.render('export-pdf.ejs');
})

app.get('/account/reset_password/:resetKey',		 function(req, res){
	res.render('reset_password.ejs', {reset_key : req.params.resetKey});
})

var MOBILE = ['/mobile','/mobile/pitch','/mobile/notification','/mobile/message','/mobile/login','/mobile/signup','/mobile/user/:user_id','/mobile/job/:job_id'];
app.get(MOBILE,function(req,res){
	res.render('mobile.ejs',{user: req.user});
})

/**************** API GET USER, JOB, APPLICATION NOT AUTHENTICATE ******************/

// app.get('/user/:user_id',function(req,res){
// 	User.findOne({_id : req.params.user_id}, function(err, user){
// 		if (err){
// 			res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
// 			res.status(200).end();
// 		}	 else
// 			res.render('user-profile.ejs', {user: user});
// 	})
	
// })

// app.get('/job/:permalink',function(req,res){

// 	Job.findOne({permalink : req.params.permalink}, function(err, job){
// 		if (err){
// 			res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
// 			res.status(200).end();
// 		}	 else
// 			res.write(JSON.stringify({error_code : 0, job : job}));
// 			res.status(200).end();
// 	})
	
// })


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
app.get('/directive/home/application-sidebar',function(req,res){
	res.render('directive/home/application-sidebar.ejs');
})
app.get('/directive/home/left-sidebar',function(req,res){
	res.render('directive/home/left-sidebar.ejs');
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
	require('./routes/login').social(app, passport);

	Router_body.post('/signup_email', 				 routes.signup);
	Router_body.post('/login_email', 				   routes.login.email);

//  ----- UPLOAD PHOTO -------------------
	Router_formdata.post('/upload_photo', 	   routes.upload_photo);

//  ----- JOB ----------------------------
	Router_body.post('/create_job',  			 		 routes.job.create);
	Router_body.post('/edit_job',   			 		 routes.job.edit);
	Router_body.post('/job_detail',  			 		 routes.job.detail);
	Router_body.post('/delete_job',						 routes.job.delete);

//  ------RECENT --------------------------
	Router_body.post('/recent',                routes.recent);

//  ------APPLY --------------------------
	Router_body.post('/apply',                 routes.apply.create);
	// Router_body.post('/edit_apply',            routes.apply.edit);
	Router_body.post('/delete_apply',          routes.apply.delete);

//  ------EDIT PROFILE --------------------------
	Router_body.post('/edit_profile',          routes.edit_profile.profile);
	Router_body.post('/edit_avatar',           routes.edit_profile.avatar);

//  ------MY JOBS --------------------------
	Router_body.post('/my_jobs',          		 routes.my_wall.my_jobs);
	Router_body.post('/my_applications',   		 routes.my_wall.my_applications);

//  ------SEARCH --------------------------------
	// by tags
	Router_body.post('/search_tag',      		   routes.search.tag);

	Router_body.post('/search_keyword',      	 routes.search.keyword);	

	app.get('/api/tags',											 routes.get.tags);

//  ------ FILE --------------------------------
	Router_formdata.post('/upload_file', 	     routes.upload_file);

//  ------ COMMENT ------------------------------
	Router_body.post('/comment',							 routes.comment.create);
	Router_body.post('/get_comments',          routes.comment.get_comments);

//  ------ LIKE--- ------------------------------
	Router_body.post('/like',							 		 routes.like);

//  ------ INTEREST --- ------------------------------
	Router_body.post('/interest',							 routes.interest);

//  ------ HIRE     --- ------------------------------
	Router_body.post('/hire',							 		 routes.hire);

//  ------ STATUS JOB     --- ------------------------------
	Router_body.post('/job_status',						 routes.job.status);

//  ------ FOLLOW     --- ------------------------------
	Router_body.post('/follow',						 		 routes.follow);

//  ------ GET_USERS     --- ------------------------------
	Router_body.post('/users',						 		 routes.get.users);

// --------GET NOTIFICATION -------------------------------
	Router_body.post('/get_notify',						 routes.get.notify);

// --------GET APPLICATIONS -------------------------------
	// get applications of any users
	Router_body.post('/get_applications',			 routes.get.applications);

// --------GET JOBS ---------------------------------------
	// get jobs of  any company
	Router_body.post('/get_jobs',			 				 routes.get.jobs);
	
	// FORGOT PASSWORD
	Router_body.post('/forgot_password', 		 	 routes.forgot_password.forgot_password);
	Router_body.post('/reset_password',				 routes.forgot_password.reset_password);

	// EXPORT TO PDF
	Router_body.post('/export_pdf',						 routes.export_pdf);

	// SWING CURRENT
	Router_body.post('/swing_current', 				 routes.swing_current);

	// SHARE
	Router_body.post('/share_job',             routes.share.job);
	Router_body.post('/share_apply',           routes.share.apply);

// --------GET DATA FROM PERMALINK -------------------------------

app.get('/:permalink',											 routes.get.permalink);

// --------GET INFOR A USER(CONTACT) ---------------------------------------

	app.get('/api/user/:user_id',							 routes.get.user);
	app.get('/api/job/:job_id',								 routes.get.job);

// -------- RETURN TOP JOB, COMPANY -------------------------------------------------

	app.get('/api/top_job',						 				 routes.get.top_job);
	app.get('/api/top_company',				 				 routes.get.top_company);

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


// var io = require('socket.io').listen(server);
// require('./my_module/chat/handler_socket')(io);

