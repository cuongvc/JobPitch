
var Application        = require('./../../models/applications');
var Job                = require('./../../models/jobs');
var check_token        = require('./../../my_module/check_exist').token;
var check_job          = require('./../../my_module/check_exist').job;


function appsOfJob(appIds, callback){
	Application.find({_id : {$in : appIds}}, function(err, application){
		if (err){
			console.log(err);
			callback(null);
		}
		callback(application);
	})
}

module.exports         = function(req, res){

	try{
		var data 		= req.body;

		var token 	= data.token;
		var user_id = data.user_id;
		var job_id 	= data.job_id;
	}

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){
			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'User is not exist'}));
				res.status(200).end();
				return 0;
			};

			check_job(job_id, function(exist2, job_exist){
				if (!exist2){
					res.write(JSON.stringify({error_code : 1, msg : 'Job is not exist'}));
					res.status(200).end();
					return 0;
				};

				appsOfJob(job_exist.applications.list, function(application){
					res.write(JSON.stringify({error_code : 0, job : job_exist, app : application}));
					res.status(200).end();					
				})

			})

		})
	}
}