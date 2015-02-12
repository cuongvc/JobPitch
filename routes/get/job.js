var Job         = require('./../../models/jobs');
var check_token = require('./../../my_module/check_exist').token;

module.exports				=	function(req, res){

	try{
		var job_id = req.params.job_id;
	}

	catch(err){
		res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
		res.status(200).end();
		return 0;
	}

	finally{
		Job.findOne({_id : job_id}, function(err, job_exist){
			if (err){
				res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
				res.status(200).end();
			} else {
				res.write(JSON.stringify({error_code : 0, job : job_exist}));
				res.status(200).end();

			}
		})
		
	}

}