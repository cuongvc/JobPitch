// position   : = 1 when search in jobs, 2 when search in applications

var async                       = require('async');

var Job                         = require('./../../models/jobs');
var Application                 = require('./../../models/applications');
var Comment                     = require('./../../models/comments');


module.exports									=	function(req, res){

	try{
		var data  						=	req.body;
		var keyword       		= data.keyword;
		var skip 							= data.skip;
		var limit             = data.limit;
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
		var results = {};

		async.waterfall([
			function(next){
				Job.search(keyword, {}, {
					sort : {time : 1},
					limit : limit,
					skip  : skip
				}, function(err, jobs){
					job_array = jobs;
					next(null);
				});
				
			},

			function(next){
				Application.search(keyword, {}, {
					sort : {time : 1},
					limit : limit,
					skip  : skip
				}, function(err, apps){
					application_array = apps;
					next(null);
				});
				
			},

			function(next){
				Comment.search(keyword, {}, {
					sort : {time : 1},
					limit : limit,
					skip  : skip
				}, function(err, cmts){
					comment_array = cmts;
					next(null)
				});
				
			}],

			function(err){
				results = {'jobs' : job_array, 'applications' : application_array, 'comments' : comment_array};
				res.write(JSON.stringify({error_code : 0, results : results}));
				res.status(200).end();
			}
		);
	}
}