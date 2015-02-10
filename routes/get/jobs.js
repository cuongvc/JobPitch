var Job         = require('./../../models/jobs');
var check_token = require('./../../my_module/check_exist').token;

module.exports				=	function(req, res){

	try{
		var data          = req.body;
		
		var user_id       = data.user_id;
		var token         = data.token;
		
		var own_of_job_id = data.own_of_job_id;
		var start         = data.start;
		var limit         = data.limit;
	}

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
		return 0;
	}

	finally{
		check_token(user_id, token, function(exist, user_exist){

			if (!exist){
				res.write(JSON.stringify({error_code : 1, msg : 'Authenticate is not success'}));
				res.status(200).end();
			} else {
				console.log(own_of_job_id);
				if (own_of_job_id == '' || typeof(own_of_job_id) == 'undefined'){
				  var q = Job.find({}).limit(limit + start).sort({'time' : -1});
				}
				else{
					var q = Job.find({user_id : own_of_job_id}).limit(limit + start).sort({'time' : -1});
				}

				q.exec(function(err, jobs){
					jobs = jobs.slice(start, limit + start);
					res.write(JSON.stringify({error_code : 0, jobs : jobs}));
					res.status(200).end();

				})
			}
		})
	}

}