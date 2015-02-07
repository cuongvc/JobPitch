var Permalink = require('./../../models/permalinks');
var User      = require('./../../models/users');
var Job       = require('./../../models/jobs');


module.exports				=	function(req, res){
	var permalink = req.params.permalink;

	Permalink.findOne({permalink : permalink}, function(err, permalink_exist){

		if(err){
			res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
			res.status(200).end();
			return 0;
		}

		if (! permalink) {
			res.write(JSON.stringify({error_code : 1, msg : 'Permalink is not exist'}));
			res.status(200).end();
			return 0;
		}

		if (permalink.type == 1){
			User.findOne({_id : permalink.user_id}, function(err, user_exist){
				if (err){
					res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
					res.status(200).end();
				} else if (!user_exist){
					res.write(JSON.stringify({error_code : 1, msg : 'User is not exist'}));
					res.status(200).end();
				} else {
					res.write(JSON.stringify({error_code : 0, user : user_exist}));
					res.status(200).end();
				}
			})
		} else

			Job.findOne({_id : permalink.job_id}, function(err, job_exist){
				if (err){
					res.write(JSON.stringify({error_code : 1, msg : err.toString()}));
					res.status(200).end();
				} else if (!job_exist){
					res.write(JSON.stringify({error_code : 1, msg : 'Job is not exist'}));
					res.status(200).end();
				} else {
					res.write(JSON.stringify({error_code : 0, job : job_exist}));
					res.status(200).end();
				}
			})
		
	})

}