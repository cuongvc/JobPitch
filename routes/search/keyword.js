// position   : = 1 when search in jobs, 2 when search in applications

var async                       = require('async');

var Job                         = require('./../../models/jobs');
var Application                 = require('./../../models/applications');
var Comment                     = require('./../../models/comments');
var User                        = require('./../../models/users');


module.exports									=	function(req, res){

	try{
		var data  						=	req.body;
		var keyword       		= data.keyword;
		var skip 							= data.skip;
		var limit             = data.limit;

		var return_job        = data.return_job;
		var return_app        = data.return_app;
		var return_comment    = data.return_comment;
		var return_user       = data.return_user;
	}	

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
		return 0;
	}

	finally{
		var comment_array = [];
		var job_array = [];
		var application_array = [];
		var user_array = [];
		var results = {};

		async.waterfall([
			function(next){
				if (!return_job ){
					next(null);
				} else{

					Job.find({}, function(err, jobs){
						if (err){
							console.log(err);
						}
						for (var i = 0 ; i < jobs.length ; i ++)
							if (jobs[i].title.indexOf(keyword) != -1 || jobs[i].description.indexOf(keyword) != -1){
								job_array.push(jobs[i]);
							}
						next(null);
					});
				}
			},

			function(next){
				if (!return_app){
					next(null);
				} else {
					Application.find({}, function(err, apps){
						if (err){
							console.log(err);
						}
						for (var i = 0 ; i < apps.length ; i ++)
							if (apps[i].description.indexOf(keyword) != -1){
								application_array.push(apps[i]);
							}
						next(null);
					});
				}
			}],

			function(err){
				results = {'jobs' : job_array, 'applications' : application_array};
				res.write(JSON.stringify({error_code : 0, results : results}));
				res.status(200).end();
			}
		);
	}
}