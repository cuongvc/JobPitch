var check_token     = require('./../../my_module/check_exist').token;
var check_job       = require('./../../my_module/check_exist').job;

module.exports			=	function(req, res){
	try{
		var data = req.body;

		var user_id = data.user_id;
		var token   = data.token;

		var job_id  = data.job_id;

	}

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
		return 0;
	}

	finally{
		check_token(user_id, token, function(exist_user, user_exist){

			if (!exist_user){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not success'}));
				res.status(200).end();
				return 0;
			}

			check_job(job_id, function(exist_job, job_exist){

				if (!exist_job){
					res.write(JSON.stringify({error_code : 1, msg : 'Job is not success'}));
					res.status(200).end();
					return 0;
				}

				job_exist.addShare(user_id);
				res.write(JSON.stringify({error_code : 0}));
				res.status(200).end();
			})

		})
	}
}